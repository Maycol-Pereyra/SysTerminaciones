import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { SucursalIndex } from './sucursal-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceHelper } from '../../../../_core/helpers/service.helper';

@Injectable({
  providedIn: 'root'
})
export class SucursalService extends TableService<SucursalIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/sucursal`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // item-select-core
  getItemSelectCore(): Observable<any> {
    const url = `${this.API_URL}/item-select-core`;

    return this.http
        .get(url)
        .pipe(
            map((response: any) => response.items),
            catchError(error => ServiceHelper.handleError(error))
        );
  }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
