import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from 'src/app/_core/crud-table';
import { SolicitudUsuarioIndex } from './solicitud-usuario-index.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Injectable({
  providedIn: 'root'
})
export class SolicitudUsuarioService extends TableService<SolicitudUsuarioIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';
  headers: HttpHeaders;

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/solicitud-usuario`;
    this.headers = ServiceHelper.obtenerHttpHeader();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  integrar(id: number, clienteId: number): Observable<any> {
    const url = `${this.API_URL}/${id}/${clienteId}/integrar`;
    return this.http
        .post(url, '', { headers: this.headers })
        .pipe(
            map(response => ({id: 1, msg: ''})),
            catchError(err => {
              const msg  = Mensajes.mensajeError(err);
              return of({ id: undefined, msg});
            })
        );
  }

  rechazar(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}/rechazar`;
    return this.http
        .post(url, '', { headers: this.headers })
        .pipe(
          map(response => ({id: 1, msg: ''})),
          catchError(err => {
            const msg  = Mensajes.mensajeError(err);
            return of({ id: undefined, msg});
          })
        );
  }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
