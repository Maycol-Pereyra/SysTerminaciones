/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';
import { catchError, map } from 'rxjs/operators';
import { ITableState, TableService } from 'src/app/_core/crud-table';
import { CajaIndex } from './caja-index.model';
import { AperturaCaja } from './apertura-caja.model';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Injectable({
  providedIn: 'root'
})
export class CajaService extends TableService<CajaIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/caja`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  abrirCaja(vm: AperturaCaja): Observable<any> {
    const url = `${this.API_URL}/abrir-caja`;
    return this.http.post<any>(url, vm)
      .pipe(
        map((response: any) => ({ id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          this._errorMessage.next(msg);
          return of({ id: undefined, msg });
        }),
      );
  }

  cerrarCaja(vm: AperturaCaja): Observable<any> {
    const url = `${this.API_URL}/cerrar-caja`;
    return this.http.post<any>(url, vm)
      .pipe(
        map((response: any) => ({ id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          this._errorMessage.next(msg);
          return of({ id: undefined, msg });
        }),
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

    return params;
  }
}
