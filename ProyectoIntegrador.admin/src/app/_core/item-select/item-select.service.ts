/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemSelect } from './item-select.model';
import { ItemSelectState } from './item-select-state';
import { Inject, Injectable } from '@angular/core';


const DEFAULT_STATE: ItemSelectState = {
    filter: [],
    pageNumber: 0,
    pageSize: 0,
    orderBy: 'descripcion',
    criterio: '',
};

@Injectable({
  providedIn: 'root'
})
export class ItemSelectService {
  private http: HttpClient;

  public static defaultFilter(): ItemSelectState {
    return {
        filter: [],
        pageNumber: 0,
        pageSize: 0,
        orderBy: 'descripcion',
        criterio: '',
    };
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(@Inject(HttpClient) http) {
    this.http = http;
  }

  public get(apiUrl: string, filter: ItemSelectState | null = null): Observable<ItemSelect[]> {
    if (!filter) {
      filter = ItemSelectService.defaultFilter();
    }

    const params = this.createParams(filter);

    return this.http.get(apiUrl, { params })
    .pipe(
      map((data: any) => data.items),
      catchError(err => of([]))
    );
  }

  public getAny(apiUrl: string, filter: ItemSelectState | null = null): Observable<any[]> {
    if (!filter) {
      filter = ItemSelectService.defaultFilter();
    }
    const params = this.createParams(filter);

    return this.http.get(apiUrl, { params })
    .pipe(
        map((data: any) => data),
        catchError(err => of([]))
    );
  }

  private createParams(state: ItemSelectState): HttpParams {
    let params = new HttpParams()
      .set('pageNumber', `${state.pageNumber}`)
      .set('pageSize', `${state.pageSize}`)
      .set('orderBy', state.orderBy)
      .set('criterio', state.criterio);

    if (state.filter) {
        state.filter.forEach(item => {
            params = params.set(item.criterio, item.valor);
        });
    }

    return params;
  }
}

