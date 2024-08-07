/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */

import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { UsuarioIndex } from './usuario-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Mensajes } from '../../../../_core/helpers/mensaje.helper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends TableService<UsuarioIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  filtro = {
    estadoId: null,
    contrasenaVerificadaId: null,
    twoFactorMetodoId: null,
    bloqueoId: null,
    fechaCreacionInicio: null,
    fechaCreacionFin: null
  };

  constructor(@Inject(HttpClient) http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/usuario`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  activar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/activar`;

    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.post(url, '', {})
    .pipe(
      map(response => ({ id: 1, msg: '' })),
      catchError(err => {
        const msg  = Mensajes.mensajeError(err);
        this._errorMessage.next(msg);
        return of({id: undefined, msg });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  inactivar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/inactivar`;

    this._isLoading$.next(true);

    this._errorMessage.next('');

    return this.http.post(url, '', {})
    .pipe(
      map(response => ({ id: 1, msg: '' })),
      catchError(err => {
        const msg  = Mensajes.mensajeError(err);
        this._errorMessage.next(msg);
        return of({id: undefined, msg });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  quitarBloqueoTransaccionPorCodigoFallido(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/quitar-bloqueo-transaccion-por-codigo-fallido`;

    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.post(url, '', {})
    .pipe(
      map(response => ({ id: 1, msg: '' })),
      catchError(err => {
        const msg  = Mensajes.mensajeError(err);
        this._errorMessage.next(msg);
        return of({id: undefined, msg });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  quitarBloqueoEntradaFallida(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/quitar-bloqueo-entrada-fallida`;

    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.post(url, '', {})
    .pipe(
      map(response => ({ id: 1, msg: '' })),
      catchError(err => {
        const msg  = Mensajes.mensajeError(err);
        this._errorMessage.next(msg);
        return of({id: undefined, msg });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  cambiarMetodoAutenticacion(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/cambiar-metodo-autenticacion`;

    this._isLoading$.next(true);
    this._errorMessage.next('');

    return this.http.post(url, '', {})
    .pipe(
      map(response => ({ id: 1, msg: '' })),
      catchError(err => {
        const msg  = Mensajes.mensajeError(err);
        this._errorMessage.next(msg);
        return of({id: undefined, msg });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  solicitarPassword(login: string): Observable<any> {
    const url = `${this.API_URL}/solicita-password`;
    this._isLoading$.next(true);
    return this.http.post<any>(url, { login })
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          // this._errorMessage.next(msg);
          return of({ id: undefined, msg });
        }),
        finalize(() => this._isLoading$.next(false))
      );
  }

  descargarExcel(): Observable<any> {
    const url = `${this.API_URL}/excel`;

    const params = this.createParams(this.tableState);

    const headers = new HttpHeaders({ 'content-type': 'application/octet-stream' });

    return this
      .http
      .get(url, { headers, params, responseType: 'arraybuffer' })
      .pipe(
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          this._errorMessage.next(msg);
          return of({ id: undefined });
        }),
        finalize(() => this._isLoading$.next(false))
      );
  }

  createParams(tableState: ITableState): HttpParams {
    let params = super.createParams(tableState);

    if (tableState.filter['estadoId']) {
      params = params.set('estadoId', tableState.filter['estadoId']);
    }

    if (tableState.filter['contrasenaVerificadaId']) {
      params = params.set('contrasenaVerificadaId', tableState.filter['contrasenaVerificadaId']);
    }

    if (tableState.filter['twoFactorMetodoId']) {
      params = params.set('twoFactorMetodoId', tableState.filter['twoFactorMetodoId']);
    }

    if (tableState.filter['bloqueoId']) {
      params = params.set('bloqueoId', tableState.filter['bloqueoId']);
    }

    if (tableState.filter['fechaCreacionInicio']) {
      params = params.set('fechaCreacionInicio', tableState.filter['fechaCreacionInicio']);
    }

    if (tableState.filter['fechaCreacionFin']) {
      params = params.set('fechaCreacionFin', tableState.filter['fechaCreacionFin']);
    }

    return params;
  }
}
