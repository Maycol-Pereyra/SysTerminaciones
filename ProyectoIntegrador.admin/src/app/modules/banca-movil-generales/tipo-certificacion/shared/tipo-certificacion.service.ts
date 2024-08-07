import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { TipoCertificacionIndex } from './tipo-certificacion-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceHelper } from '../../../../_core/helpers/service.helper';

@Injectable({
  providedIn: 'root'
})
export class TipoCertificacionService extends TableService<TipoCertificacionIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/tipo-certificacion`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // item-select-core
  getItemSelectCore(): Observable<any> {
    const url = `${this.API_URL}/item-select-core`;

    return this.http
        .get(url)
        .pipe(
            map((response: any) => response.items),
            catchError(error => ServiceHelper.handleError(error))
        );
  }

  activar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/activar`;
    return this.http.post<any>(url, '')
      .pipe(
        map((response: any) => ({ id: 1, msg: ''})),
        catchError(error => ServiceHelper.handleError(error)
      ));
  }

  inactivar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/inactivar`;
    return this.http.post<any>(url, '')
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(error => ServiceHelper.handleError(error)
      ));
  }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);
    // params = params.set('','');

    return params;
  }
}
