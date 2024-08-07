/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { PaginatorState } from '../models/paginator.model';
import { ITableState, TableResponseModel } from '../models/table.model';
import { BaseModel } from '../models/base.model';
import { SortState } from '../models/sort.model';
import { GroupingState } from '../models/grouping.model';
import { Mensajes } from '../../helpers/mensaje.helper';

export abstract class TableService<Tindex> {
  public _isLoading$ = new BehaviorSubject<boolean>(false);
  public _errorMessage = new BehaviorSubject<string>('');

  // Getters
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }

  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  get tableState() {
    return this._tableState$.value;
  }

  // API URL has to be overrided
  API_URL = `.../api/[endpoint]`;

  protected http: HttpClient;

  private DEFAULT_STATE: ITableState = {
    filter: {},
    paginator: new PaginatorState(),
    sorting: new SortState(),
    searchTerm: '',
    grouping: new GroupingState(),
    entityId: undefined
  };

  private _items$ = new BehaviorSubject<Tindex[]>([]);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<ITableState>(this.DEFAULT_STATE);
  private _subscriptions: Subscription[] = [];

  constructor(http: HttpClient) {
    this.http = http;
  }

  limpiarMessege(): void {
    this._errorMessage.next('');
  }

  limpiarItems(): void {
    this._items$.next([]);
    this.setDefaults();
  }

  // CREATE
  // server should return the object with ID
  create(item: BaseModel): Observable<BaseModel> {
    this._isLoading$.next(true);

    this._errorMessage.next('');

    return this.http.post<BaseModel>(this.API_URL, item)
    .pipe(
      map((response: any) => {
        if (response && response.id){
          return { id: response.id, msg: '' };
        }

        return { id: 9999999999, msg: '' };
      }),
      catchError(err => {
        const msg  = Mensajes.mensajeError(err);
        this._errorMessage.next(msg);
        return of({ id: undefined, msg });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // READ (Returning filtered list of entities)
  find(tableState: ITableState): Observable<TableResponseModel<Tindex>> {
    const url = this.API_URL;
    this._errorMessage.next('');

    const params = this.createParams(tableState);

    return this.http.get<TableResponseModel<Tindex>>(url, { params })
    .pipe(
      catchError(err => {
        if (err.status === 400 && err.error) {
          this._errorMessage.next(err.error);
        } else {
          this._errorMessage.next('No se pudo completar la consulta');
        }
        console.error('FIND ITEMS', err);
        return of({ items: [], totalCount: 0, pageNumber: 0, pageSize: 0});
      })
    );
  }

  createParams(tableState: ITableState): HttpParams {
    const direction = tableState.sorting.direction === 'desc' ? ' desc' : '';

    return new HttpParams()
      .set('pageNumber', `${tableState.paginator.page}`)
      .set('pageSize', `${tableState.paginator.pageSize}`)
      .set('orderBy', `${tableState.sorting.column}${direction}`)
      .set('criterio', tableState.searchTerm);
  }

  getItemById(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.get<BaseModel>(url)
    .pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  getInfo(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}/info`;
    return this.http.get<BaseModel>(url)
    .pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  getNew(): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/nuevo`;
    return this.http.get<BaseModel>(url)
    .pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', 0, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE
  update(item: BaseModel): Observable<any> {
    return this.create(item);
    // const url = `${this.API_URL}/${item.id}`;
    // this._isLoading$.next(true);
    // this._errorMessage.next('');
    // return this.http.put(url, item)
    // .pipe(
    //   catchError(err => {
    //     this._errorMessage.next(err);
    //     console.error('UPDATE ITEM', item, err);
    //     return of(item);
    //   }),
    //   finalize(() => this._isLoading$.next(false))
    // );
  }

  // DELETE
  delete(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url)
      .pipe(
        map(() => of({})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          this._errorMessage.next(msg);
          console.error('DELETE ITEM', id, msg);
          return of({ msg });
        }),
        finalize(() => this._isLoading$.next(false)
      )
    );
  }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find(this._tableState$.value)
      .pipe(
        tap((res: TableResponseModel<Tindex>) => {
          this._items$.next(res.items);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              res.totalCount
            ),
          });
        }),
        catchError((err) => {
          if (err.status === 400 && err.error) {
            this._errorMessage.next(err.error);
          } else {
            this._errorMessage.next('No se pudo completar la consulta');
          }
          return of({
            items: [],
            total: 0
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: Tindex) => {
            const item = (el as unknown) as BaseModel;
            return item.id;
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ grouping: new GroupingState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(this.DEFAULT_STATE);
    this._errorMessage.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }
}
