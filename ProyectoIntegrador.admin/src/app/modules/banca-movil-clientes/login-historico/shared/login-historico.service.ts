/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { TableService, BaseModel, ITableState } from 'src/app/_core/crud-table';
import { LoginHistoricoIndex } from './login-historico-index.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Injectable({
  providedIn: 'root'
})
export class BancaMovilLoginHistoricoService extends TableService<LoginHistoricoIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/login-historico`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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

    if (tableState.filter['fechaCreacionInicio']) {
      params = params.set('fechaCreacionInicio', tableState.filter['fechaCreacionInicio']);
    }

    if (tableState.filter['fechaCreacionFin']) {
      params = params.set('fechaCreacionFin', tableState.filter['fechaCreacionFin']);
    }

    if (tableState.filter['entradaValidaId']) {
      params = params.set('entradaValidaId', tableState.filter['entradaValidaId']);
    }

    return params;
  }
}
