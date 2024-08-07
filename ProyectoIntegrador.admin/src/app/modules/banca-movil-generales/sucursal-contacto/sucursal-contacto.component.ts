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

import { SucursalContactoService } from './shared/sucursal-contacto.service';
import { EditSucursalContactoModalComponent } from './components/edit-sucursal-contacto-modal/edit-sucursal-contacto-modal.component';
import { DeleteSucursalContactoModalComponent } from './components/delete-sucursal-contacto-modal/delete-sucursal-contacto-modal.component';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-sucursal-contacto',
  templateUrl: './sucursal-contacto.component.html',
  styleUrls: ['./sucursal-contacto.component.scss'],
})
export class SucursalContactoComponent
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
    public service: SucursalContactoService
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
    if (this.accesosService.puedeCrear('banca-movil.sucursal-contacto.crear')) {
      const modalRef = this.modalService.open(EditSucursalContactoModalComponent, { size: 'lg' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  edit(id: number) {
    if (this.accesosService.puedeEditar('banca-movil.sucursal-contacto.editar')) {
      const modalRef = this.modalService.open(EditSucursalContactoModalComponent, { size: 'lg' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  delete(id: number) {
    if (this.accesosService.puedeBorrar('banca-movil.sucursal-contacto.borrar')) {
      const modalRef = this.modalService.open(DeleteSucursalContactoModalComponent);
      modalRef.componentInstance.id = id;
      modalRef.result.then(() => this.service.fetch(), () => { });
    }
  }
}
