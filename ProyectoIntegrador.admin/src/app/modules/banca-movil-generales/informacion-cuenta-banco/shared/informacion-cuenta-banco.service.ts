import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from '../../../../_core/crud-table';
import { InformacionCuentaBancoIndex } from './informacion-cuenta-banco-index.model';
import { AppConfig } from '../../../../_core/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionCuentaBancoService extends TableService<InformacionCuentaBancoIndex> implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL = '';

  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/banca-movil/admin/informacion-cuenta-banco`;
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
