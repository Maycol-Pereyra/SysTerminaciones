/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
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
import { EditRegistroModalComponent } from './components/edit-registro-modal/edit-registro-modal.component';
import { RegistroService } from './shared/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent
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

  @Input() tipoRegistroId: number;
  @Input() titulo: string;
  @Input() accesoCrearId: string;
  @Input() accesoEditarId: string;
  @Input() accesoActivarId: string;
  @Input() accesoInactivarId: string;

  public listaTipoSolicitud: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private accesosService: AccesosService,
    public service: RegistroService
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
    if (this.accesosService.puedeCrear(`${this.accesoCrearId}`)) {
      const modalRef = this.modalService.open(EditRegistroModalComponent, { size: 'md', backdrop: 'static' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  edit(id: number) {
    if (this.accesosService.puedeEditar(`${this.accesoEditarId}`)) {
      const modalRef = this.modalService.open(EditRegistroModalComponent, { size: 'md', backdrop: 'static' });
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.titulo = this.titulo;
      modalRef.componentInstance.accesoActivarId = this.accesoActivarId;
      modalRef.componentInstance.accesoInactivarId = this.accesoInactivarId;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }
}
