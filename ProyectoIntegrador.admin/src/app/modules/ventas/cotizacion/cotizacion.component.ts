/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import {
  IEditAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  PaginatorState,
  SortState,
  GroupingState
} from 'src/app/_core/crud-table';
import { CotizacionService } from './shared/cotizacion.service';
import { InfoCotizacionModalComponent } from './components/info-cotizacion-modal/info-cotizacion-modal.component';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';
import { EditCotizacionModalComponent } from './components/edit-cotizacion-modal/edit-cotizacion-modal.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html'
})
export class CotizacionComponent
  implements
  OnInit,
  OnDestroy,
  IEditAction,
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

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private accesosService: AccesosService,
    public service: CotizacionService
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.searchForm();
    this.filterForm();
    this.service.fetch();
    this.grouping = this.service.grouping;
    this.paginator = this.service.paginator;
    this.sorting = this.service.sorting;

    const sb = this.service.isLoading$.subscribe(res => this.isLoading = res);

    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }


  filterForm() {
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [this.service.searchTerm],
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

  formaFiltro() {
    const filter = {};

    return filter;
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

  create() {
    if (this.accesosService.puedeCrear('ventas.cotizacion.crear')) {
      const modalRef = this.modalService.open(EditCotizacionModalComponent, { size: 'xl', backdrop: 'static' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  info(row: any) {
    if (this.accesosService.puedeEditar('ventas.cotizacion.ver-info')) {
      const modalRef = this.modalService.open(InfoCotizacionModalComponent, { size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.id = row.id;
      modalRef.result.then(
        () => { },
        () => { }
      );
    }
  }

  edit(row: any) {
    if (this.accesosService.puedeEditar('ventas.cotizacion.editar')) {
      if (this.validarEditar(row) === false) { return; }
      const modalRef = this.modalService.open(EditCotizacionModalComponent, { size: 'xl', backdrop: 'static' });
      modalRef.componentInstance.id = row.id;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  private validarEditar(row: any): boolean {
    if (row.estadoDescripcion !== 'En Proceso') {
      Mensajes.mensajeValidacion('La cotización no se encuentra en un estado disponible para editar');
      return false;
    }

    return true;
  }
}
