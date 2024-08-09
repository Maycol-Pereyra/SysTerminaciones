/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/_core/helpers/service.helper';
import { catchError, map } from 'rxjs/operators';
import { ITableState, TableService } from 'src/app/_core/crud-table';
import { ProvinciaIndex } from './provincia-index.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends TableService<ProvinciaIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/provincia`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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
