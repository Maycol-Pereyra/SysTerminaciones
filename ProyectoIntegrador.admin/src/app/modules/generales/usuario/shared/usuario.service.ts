/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableService, ITableState } from 'src/app/_core/crud-table';
import { UsuarioIndex } from './usuario-index.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends TableService<UsuarioIndex> implements OnDestroy {
  API_URL = '';
  constructor(@Inject(HttpClient)  http) {
    super(http);
    this.API_URL = `${AppConfig.settings.api}/api/usuario`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createParams(tableState: ITableState): HttpParams {
    let params = super.createParams(tableState);

    // params = params.set('','');

    return params;
  }
}
