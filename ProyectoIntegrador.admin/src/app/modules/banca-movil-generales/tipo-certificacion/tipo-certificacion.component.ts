/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GroupingState,
  PaginatorState,
  SortState,
  IEditAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_core/crud-table';

import { TipoCertificacionService } from './shared/tipo-certificacion.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { EditTipoCertificacionModalComponent } from './components/edit-tipo-certificacion-modal/edit-tipo-certificacion-modal.component';
import {
  DeleteTipoCertificacionModalComponent
} from './components/delete-tipo-certificacion-modal/delete-tipo-certificacion-modal.component';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Component({
  selector: 'app-tipo-certificacion',
  templateUrl: './tipo-certificacion.component.html'
})
export class TipoCertificacionComponent
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
    public service: TipoCertificacionService
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.searchForm();
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
    this.filterGroup = this.fb.group({
      searchTerm: [this.service.searchTerm],
    });
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
    const filter = {};
    this.service.patchState({ filter });
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
    if (this.accesosService.puedeCrear('banca-movil.tipo-certificacion.crear')) {
      const modalRef = this.modalService.open(EditTipoCertificacionModalComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  edit(id: number) {
    if (this.accesosService.puedeEditar('banca-movil.tipo-certificacion.editar')) {
      const modalRef = this.modalService.open(EditTipoCertificacionModalComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  delete(id: number) {
    if (this.accesosService.puedeBorrar('banca-movil.tipo-certificacion.borrar')) {
      const modalRef = this.modalService.open(DeleteTipoCertificacionModalComponent, { backdrop: 'static' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() => this.service.fetch(), (msg: any) => {
        if (msg) {
          Mensajes.mensajeValidacion(msg);
        }
      });
    }
  }
}
