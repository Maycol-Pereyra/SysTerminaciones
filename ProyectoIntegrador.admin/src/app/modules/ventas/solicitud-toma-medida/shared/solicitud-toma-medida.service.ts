/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { SolicitudTomaMedidaIndex } from './solicitud-toma-medida-index.model';
import { ITableState, TableService } from 'src/app/_core/crud-table';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';
import { SolicitudTomaMedida } from './solicitud-toma-medida.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudTomaMedidaService extends TableService<SolicitudTomaMedidaIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/solicitud-toma-medida`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  tomarMedida(vm: SolicitudTomaMedida): Observable<any> {
    const url = `${this.API_URL}/tomar-medida`;
    return this.http.post<any>(url, vm)
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(error => ServiceHelper.handleError(error)
      ));
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

    return params;
  }
}
