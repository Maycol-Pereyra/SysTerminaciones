import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { FiltroItem } from '../models/filtro-item.model';
import { FiltroItemSelect } from '../models/filtro-item-select.model';

@Injectable()
export class ServiceHelper {

    public static handleError(error: any) {
      return throwError (error || 'Se ha producido un error en el servidor');
    }

    public static obtenerHttpHeader(): HttpHeaders {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }


    public static obtenerParametrosPaginacionIndex(obj: any): HttpParams {

      let params = new HttpParams()
        .set('paginacion.cantidadElementoPagina', `${obj.paginacion.cantidadElementoPagina}`)
        .set('paginacion.paginaActual', `${obj.paginacion.paginaActual}`)
        .set('orden.campo', obj.orden.campo)
        .set('orden.orientacion', obj.orden.orientacion);

      if (obj.filtro !== undefined && obj.filtro !== null && obj.filtro.length > 0) {
        obj.filtro.forEach((value: any, index: number, lista: FiltroItem []) => {
          params = params.append('filtro.' + value.criterio, value.valor);
        });
      }

      return params;
  }

  public static obtenerParametrosItemSelect(filtro: FiltroItemSelect): HttpParams {
    filtro = filtro || new FiltroItemSelect(null);

    let params = new HttpParams();

    if (filtro.criterio) {
      params = params.append('filtro.filtroGeneral', filtro.criterio);
    }

    if (filtro.elementoId) {
      params = params.append('filtro.filtroElementoId', `${filtro.elementoId}`);
    }

    if (filtro.elementoExcluirId) {
      params = params.append('filtro.filtroElementoExcluirId', `${filtro.elementoExcluirId}`);
    }

    if (filtro.filtros !== undefined && filtro.filtros !== null && filtro.filtros.length > 0) {
      filtro.filtros.forEach((item: FiltroItem) => {
        params = params.append('filtro.' + item.criterio, item.valor);
      });
    }

    params = params.append('paginacion.desde', `${filtro.desde}`);
    params = params.append('paginacion.hasta', `${filtro.hasta}`);

    return params;
  }
}
