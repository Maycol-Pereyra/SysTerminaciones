/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  GroupingState,
  PaginatorState,
  SortState,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_core/crud-table';

import { BancaMovilLoginHistoricoService } from './shared/login-historico.service';
import { getDateNullFromString, getStringFromDate } from '../../../_metronic/core/utils/types-convertion.utils';
import { ChangeDetectorRef } from '@angular/core';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-banca-movil-login-historico',
  templateUrl: './login-historico.component.html',
  styleUrls: ['./login-historico.component.scss'],
})
export class LoginHistoricoComponent
  implements
  OnInit,
  OnDestroy,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  IFilterView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;

  cargandoArchivoExcel = false;

  private subscriptions: Subscription[] = [];

  constructor(
    public service: BancaMovilLoginHistoricoService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private accesosService: AccesosService,
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();

    this.service.paginator.pageSize = 5;

    this.filter();
    this.grouping = this.service.grouping;
    this.paginator = this.service.paginator;
    this.sorting = this.service.sorting;

    const sb = this.service.isLoading$.subscribe(res => this.isLoading = res);

    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
    this.search('');
  }


  filterForm() {
    const hoy = new Date();
    const fechaCreacionInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const fechaCreacionFin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    this.filterGroup = this.fb.group({
      fechaCreacionInicio: [getStringFromDate(fechaCreacionInicio)],
      fechaCreacionFin: [getStringFromDate(fechaCreacionFin)],
      entradaValidaId: [null]
    });

    // this.filterGroup = this.fb.group({
    //   fechaCreacionInicio: [null],
    //   fechaCreacionFin: [null],
    // });

    this.subscriptions.push(
      this.filterGroup.controls.fechaCreacionInicio.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.fechaCreacionFin.valueChanges
        .pipe(
          debounceTime(150),
          distinctUntilChanged()
        )
        .subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.entradaValidaId.valueChanges
        .pipe(
          debounceTime(150),
          distinctUntilChanged()
        )
        .subscribe(() => this.filter())
    );
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [this.service.searchTerm || '']
    });

    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));

    this.subscriptions.push(searchEvent);
  }


  filter() {
    const filter = this.formaFiltro();
    this.service.patchState({ filter });
  }

  filterPatchStateWithoutFetch() {
    const filter = this.formaFiltro();
    this.service.patchStateWithoutFetch({ filter });
  }

  search(searchTerm: string) {
    this.service.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.service.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.service.patchState({ paginator });
  }

  // form actions

  descargaExcelNo1(): void {
    if (this.accesosService.puedeExportar('banca-movil.login-historico.exportar')) {
      if (this.cargandoArchivoExcel) {
        return;
      }

      this.cargandoArchivoExcel = true;

      this.filterPatchStateWithoutFetch();

      this.service
        .descargarExcel()
        .subscribe(response => {
          this.downloadfile(response, 'login-historico.xlsx');
          this.cargandoArchivoExcel = false;
          this.cd.detectChanges();
        }, (error: Response) => {
          this.cargandoArchivoExcel = false;
          this.cd.detectChanges();
          // AlertasHelper.showError(error);
        });
    }
  }

  private formaFiltro() {
    const filter = {};

    const fechaCreacionInicio = this.filterGroup.get('fechaCreacionInicio').value;
    const fechaCreacionFin = this.filterGroup.get('fechaCreacionFin').value;
    const entradaValidaId = +this.filterGroup.get('entradaValidaId').value;

    const f1 = getDateNullFromString(fechaCreacionInicio);
    if (f1) {
      filter['fechaCreacionInicio'] = this.getStringYYYYMMDDFromDate(f1);
    }

    const f2 = getDateNullFromString(fechaCreacionFin);
    if (f2) {
      filter['fechaCreacionFin'] = this.getStringYYYYMMDDFromDate(f2);
    }

    if (entradaValidaId) {
      filter['entradaValidaId'] = entradaValidaId;
    }

    return filter;
  }

  private getStringYYYYMMDDFromDate(value: Date | null): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const DELIMITER = '-';
    value = new Date(value);
    const dia = value.getDate();
    const mes = value.getMonth() + 1;
    const ano = value.getFullYear();
    return `${ano}` + DELIMITER + `${mes}` + DELIMITER + `${dia}`;
  }

  private downloadfile(data: any, nombreArchivo: string): void  {
    const blob = new Blob([data], { type: 'application/octet-stream' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }
}
