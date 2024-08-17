/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../_core/services/app-config.service';
import { CotizacionIndex } from './cotizacion-index.model';
import { ITableState, TableService } from 'src/app/_core/crud-table';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService extends TableService<CotizacionIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/cotizacion`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createParams(tableState: ITableState): HttpParams {
    let params = super.createParams(tableState);

    return params;
  }
}
