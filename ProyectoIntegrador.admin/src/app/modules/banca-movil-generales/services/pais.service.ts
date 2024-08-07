import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';


@Injectable({
  providedIn: 'root'
})
export class PaisService implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  private subscriptions: Subscription[] = [];
  private http: HttpClient;

  constructor(@Inject(HttpClient) http) {
    this.http = http;
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/no-user/pais`;
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
}
