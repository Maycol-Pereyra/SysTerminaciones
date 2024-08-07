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

import { AccesosService } from 'src/app/_core/services/acceso.service';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';
import { TipoServicioReclamacionService } from './shared/tipo-servicio-reclamacion.service';
import {
  EditTipoServicioReclamacionModalComponent
} from './components/edit-tipo-servicio-reclamacion-modal/edit-tipo-servicio-reclamacion-modal.component';
import {
  DeleteTipoServicioReclamacionModalComponent
} from './components/delete-tipo-servicio-reclamacion-modal/delete-tipo-servicio-reclamacion-modal.component';
import { TipoServicioReclamacionEnum } from './shared/tipo-servicio-reclamacion.enum';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';

@Component({
  selector: 'app-tipo-servicio-reclamacion',
  templateUrl: './tipo-servicio-reclamacion.component.html'
})
export class TipoServicioReclamacionComponent
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

  tipoServicioReclamacionEnum = TipoServicioReclamacionEnum;

  public listaTipoSolicitud: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private accesosService: AccesosService,
    public service: TipoServicioReclamacionService
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.llenarListaTipoSolicitud();
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
    this.filterGroup = this.fb.group({
      tipoSolicitudId: [null],
    });

    this.subscriptions.push(
      this.filterGroup.controls.tipoSolicitudId.valueChanges.subscribe(() => this.filter())
    );
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

    const tipoSolicitudId = +this.filterGroup.get('tipoSolicitudId').value;

    if (tipoSolicitudId) {
      filter['tipoSolicitudId'] = tipoSolicitudId;
    }

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
    if (this.accesosService.puedeCrear('banca-movil.tipo-servicio-reclamacion.crear')) {
      const modalRef = this.modalService.open(EditTipoServicioReclamacionModalComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  edit(id: number) {
    if (this.accesosService.puedeEditar('banca-movil.tipo-servicio-reclamacion.editar')) {
      const modalRef = this.modalService.open(EditTipoServicioReclamacionModalComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  delete(id: number) {
    if (this.accesosService.puedeBorrar('banca-movil.tipo-servicio-reclamacion.borrar')) {
      const modalRef = this.modalService.open(DeleteTipoServicioReclamacionModalComponent, { backdrop: 'static' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() => this.service.fetch(), (msg: any) => {
        if (msg) {
          Mensajes.mensajeValidacion(msg);
        }
      });
    }
  }

  llenarListaTipoSolicitud(): void {
    this.listaTipoSolicitud.push(new ItemSelect({ id: 1 , descripcion: 'Servicio' }));
    this.listaTipoSolicitud.push(new ItemSelect({ id: 2, descripcion: 'Reclamación' }));
  }
}
