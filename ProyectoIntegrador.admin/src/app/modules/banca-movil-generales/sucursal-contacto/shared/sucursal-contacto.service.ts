import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { SucursalContactoIndex } from './sucursal-contacto-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalContactoService extends TableService<SucursalContactoIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/sucursal-contacto`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // // item-select-core
  // getItemSelectCore(): Observable<any> {
  //   const url = `${this.API_URL}/item-select-core`;

  //   return this.http
  //       .get(url)
  //       .pipe(
  //           map((response: any) => {
  //               return response.items;
  //           }),
  //           catchError(error => ServiceHelper.handleError(error))
  //       );
  // }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
