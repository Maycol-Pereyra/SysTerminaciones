/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';

@Injectable({
  providedIn: 'root'
})
export class EmpresaConfiguracionGeneralService implements OnDestroy {
  API_URL = '';

  private subscriptions: Subscription[] = [];
  private http: HttpClient;

  constructor(@Inject(HttpClient) http) {
    this.http = http;
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/empresa-configuracion-general`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  get(): Observable<any> {
    const url = `${this.API_URL}`;

    return this.http.get(url)
      .pipe(
          map((response: any) => response),
          catchError(error => ServiceHelper.handleError(error))
      );
  }
}
