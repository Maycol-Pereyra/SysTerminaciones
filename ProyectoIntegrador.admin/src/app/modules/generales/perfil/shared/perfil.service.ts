/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, BaseModel, ITableState } from 'src/app/_core/crud-table';
import { PerfilIndex } from './perfil-index.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends TableService<PerfilIndex> implements OnDestroy {
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/generales/admin/perfil`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  getNuevo(): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/nuevo`;
    return this.http.get<BaseModel>(url)
    .pipe(
      catchError(err => {
        this._errorMessage.next(err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  getCopia(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}/copia`;
    return this.http.get<BaseModel>(url)
    .pipe(
      catchError(err => {
        this._errorMessage.next(err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
