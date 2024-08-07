
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { TableService, ITableState } from '../../../../_core/crud-table';
import { ConfiguracionGeneralIndex } from './configuracion-general-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGeneralService extends TableService<ConfiguracionGeneralIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  // eslint-disable-next-line no-trailing-spaces
  constructor(@Inject(HttpClient) http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/generales/admin/configuracion-general`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createParams(tableState: ITableState): HttpParams {
    const params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
