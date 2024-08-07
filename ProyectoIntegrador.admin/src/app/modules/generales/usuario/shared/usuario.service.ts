/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from 'src/app/_core/crud-table';
import { UsuarioIndex } from './usuario-index.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends TableService<UsuarioIndex> implements OnDestroy {
  API_URL = '';
  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/generales/admin/usuario-admin`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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

  createParams(tableState: ITableState): HttpParams {
    let params = super.createParams(tableState);

    if (tableState.filter['bloqueoId']) {
      params = params.set('bloqueoId', tableState.filter['bloqueoId']);
    }

    // params = params.set('','');

    return params;
  }
}
