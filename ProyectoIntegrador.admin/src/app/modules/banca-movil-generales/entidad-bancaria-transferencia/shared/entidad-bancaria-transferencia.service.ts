import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { EntidadBancariaTransferenciaIndex } from './entidad-bancaria-transferencia-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Injectable({
  providedIn: 'root'
})
export class EntidadBancariaTransferenciaService extends TableService<EntidadBancariaTransferenciaIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/entidad-bancaria-transferencia`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  activar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/activar`;

    return this.http.post<any>(url, '')
      .pipe(
        map((response: any) => ({ id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        })
      );
  }

  inactivar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/inactivar`;

    return this.http.post<any>(url, '')
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        })
      );
  }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
