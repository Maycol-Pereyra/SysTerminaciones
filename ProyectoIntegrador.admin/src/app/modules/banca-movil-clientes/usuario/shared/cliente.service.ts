import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { ServiceHelper } from '../../../../_core/helpers/service.helper';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from './cliente.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  private http: HttpClient;
  private subscriptions: Subscription[] = [];
  private headers: HttpHeaders;

  constructor(@Inject(HttpClient) http) {
    this.http = http;
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/cliente`;
    this.headers = ServiceHelper.obtenerHttpHeader();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  public obtenerDatosIndex(criterio: string, cantidad: number): Observable<any> {
    const params = this.createParams(criterio, cantidad);

    const url = `${this.API_URL}/lista`;
    return this
      .http
      .get(url, { headers: this.headers, params })
      .pipe(
        map(response => response),
        catchError(error => ServiceHelper.handleError(error))
      );
  }

  getById(id: number): Observable<Cliente> {
    const url = `${this.API_URL}/${id}`;
    return this.http
      .get(url, { headers: this.headers })
      .pipe(
          map((response: any) => new Cliente(response)),
          catchError(error => ServiceHelper.handleError(error))
      );
  }

  createParams(criterio: string, pageSize: number): HttpParams {
    const params = new HttpParams()
      .set('pageNumber', `1`)
      .set('pageSize', `${pageSize}`)
      .set('orderBy', `nombre`)
      .set('criterio', criterio);

    return params;
  }
}
