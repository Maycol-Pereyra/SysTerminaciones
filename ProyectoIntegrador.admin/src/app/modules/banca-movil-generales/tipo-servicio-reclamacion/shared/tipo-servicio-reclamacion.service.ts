/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { TipoServicioReclamacionIndex } from './tipo-servicio-reclamacion-index.model';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioReclamacionService extends TableService<TipoServicioReclamacionIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/tipo-servicio-reclamacion`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  getLista(): Observable<any> {
    const url = `${this.API_URL}/lista`;

    return this.http
        .get(url)
        .pipe(
            map((response: any) => response),
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
    let params = super.createParams(tableState);

    if (tableState.filter['tipoSolicitudId']) {
      params = params.set('tipoSolicitudId', tableState.filter['tipoSolicitudId']);
    }

    return params;
  }
}
