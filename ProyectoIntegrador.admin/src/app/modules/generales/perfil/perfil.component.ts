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

import { PerfilService } from './shared/perfil.service';
import { EditPerfilModalComponent } from './components/edit-perfil-modal/edit-perfil-modal.component';
import { DeletePerfilModalComponent } from './components/delete-perfil-modal/delete-perfil-modal.component';
import { FormIndexBase } from 'src/app/_core/clase-base/form-index-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { Mensajes } from '../../../_core/helpers/mensaje.helper';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent
  extends FormIndexBase
  implements
  OnInit,
  OnDestroy,
  IEditAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView {

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
    public service: PerfilService
  ) {
    super();
  }

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
      // status: [''],
      // type: [''],
      searchTerm: [this.service.searchTerm],
    });
    // this.subscriptions.push(
    //   this.filterGroup.controls.status.valueChanges.subscribe(() =>
    //     this.filter()
    //   )
    // );
    // this.subscriptions.push(
    //   this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    // );
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [this.service.searchTerm],
    });

    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  filter() {
    const filter = {};
    // const status = this.filterGroup.get('status').value;
    // if (status) {
    //   filter['status'] = status;
    // }

    // const type = this.filterGroup.get('type').value;
    // if (type) {
    //   filter['type'] = type;
    // }
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
    if (this.accesosService.puedeCrear('generales.perfil.crear')) {
      const modalRef = this.modalService.open(EditPerfilModalComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  edit(id: number) {
    if (this.accesosService.puedeEditar('generales.perfil.editar')) {
      const modalRef = this.modalService.open(EditPerfilModalComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  copy(id: number, descripcion: string) {
    if (this.accesosService.puedeCopiar('generales.perfil.copiar')) {
      Mensajes.confirmacion(`¿Desea copiar el perfil: '${descripcion}'?`, 'Confirmación', () => {
        const modalRef = this.modalService.open(EditPerfilModalComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.esParaCopia = true;
        modalRef.result.then(() =>
          this.service.fetch(),
          () => { }
        );
      });
    }
  }

  delete(id: number) {
    if (this.accesosService.puedeBorrar('generales.perfil.borrar')) {
      const modalRef = this.modalService.open(DeletePerfilModalComponent, { backdrop: 'static'});
      modalRef.componentInstance.id = id;
      modalRef.result.then(() => this.service.fetch(), (msg: any) => {
        if (msg) {
          this.mensajeValidacion(msg);
        }
      });
    }
  }
}
