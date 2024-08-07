/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { ItemSelectState } from 'src/app/_core/item-select/item-select-state';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { AppConfig } from 'src/app/_core/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class SelectConBusquedaService {
  private http: HttpClient;

  static defaultFilter(): ItemSelectState {
    return {
        filter: [
          { criterio: 'esComponenteConBusqueda', valor: '1'},
          { criterio: 'busquedaSoloSiTengoCriterio', valor: '1'},
          { criterio: 'incluyeUnOtros', valor: '0'},
        ],
        pageNumber: 0,
        pageSize: 30,
        orderBy: 'descripcion',
        criterio: '',
    };
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(@Inject(HttpClient) http) {
    this.http = http;
  }

  public get(endPoint: string, criterio: string, filter: ItemSelectState | null = null): Observable<ItemSelect[]> {
    if (!filter) {
      filter = SelectConBusquedaService.defaultFilter();
    }

    filter.criterio = criterio;

    const params = this.createParams(filter);
    const url = `${AppConfig.settings.api}${endPoint}`;

    return this.http.get(url, { params })
    .pipe(
        map((data: any) => data.items),
        catchError(err => of([]))
    );
  }

  private createParams(state: ItemSelectState): HttpParams {
    let params = new HttpParams()
      .set('pageNumber', `${state.pageNumber}`)
      .set('pageSize', `${state.pageSize}`)
      .set('orderBy', state.orderBy)
      .set('criterio', state.criterio);

    if (state.filter) {
      state.filter.forEach(item => {
        params = params.set(item.criterio, item.valor);
      });
    }

    return params;
  }
}
