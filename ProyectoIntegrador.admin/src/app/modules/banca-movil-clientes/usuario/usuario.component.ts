/* eslint-disable @typescript-eslint/dot-notation */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

import { UsuarioService } from './shared/usuario.service';
import { EditUsuarioModalComponent } from './components/edit-usuario-modal/edit-usuario-modal.component';
import { CreateUsuarioModalComponent } from './components/create-usuario-modal/create-usuario-modal.component';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { getDateNullFromString } from 'src/app/_metronic/core/utils/types-convertion.utils';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements
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
  cargandoArchivoExcel = false;
  mostrarMasFiltros = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private accesosService: AccesosService,
    public service: UsuarioService
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
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
      estadoId: [this.service.filtro.estadoId],
      contrasenaVerificadaId: [this.service.filtro.contrasenaVerificadaId],
      twoFactorMetodoId: [this.service.filtro.twoFactorMetodoId],
      bloqueoId: [this.service.filtro.bloqueoId],
      fechaCreacionInicio: [this.service.filtro.fechaCreacionInicio],
      fechaCreacionFin: [this.service.filtro.fechaCreacionFin],
    });

    this.subscriptions.push(
      this.filterGroup.controls.estadoId.valueChanges.subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.contrasenaVerificadaId.valueChanges.subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.twoFactorMetodoId.valueChanges.subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.bloqueoId.valueChanges.subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.fechaCreacionInicio.valueChanges.subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.filterGroup.controls.fechaCreacionFin.valueChanges.subscribe(() => this.filter())
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
    setTimeout(() => {
      const filter = this.formaFiltro();
      this.actualizaFiltroEnServicio();
      this.service.patchState({ filter });
    }, 100);
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
    if (this.accesosService.puedeCrear('banca-movil.usuario.crear')) {
      const modalRef = this.modalService.open(CreateUsuarioModalComponent, { size: 'lg' });
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  edit(id: number) {
    if (this.accesosService.puedeEditar('banca-movil.usuario.editar')) {
      const modalRef = this.modalService.open(EditUsuarioModalComponent, { size: 'lg' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
        this.service.fetch(),
        () => { }
      );
    }
  }

  delete(id: number) {
    // const modalRef = this.modalService.open(DeleteUsuarioModalComponent);
    // modalRef.componentInstance.id = id;
    // modalRef.result.then(() => this.service.fetch(), () => { });
  }

  refrescar(): void {
    this.service.fetch();
  }

  filterPatchStateWithoutFetch() {
    const filter = this.formaFiltro();
    this.service.patchStateWithoutFetch({ filter });
  }

  descargaExcelNo1(): void {
    if (this.accesosService.puedeExportar('banca-movil.usuario.exportar')) {
      if (this.cargandoArchivoExcel) {
        return;
      }

      this.cargandoArchivoExcel = true;

      this.filterPatchStateWithoutFetch();

      this.service
        .descargarExcel()
        .subscribe(response => {
          this.downloadfile(response, 'usuarios-banca-movil.xlsx');
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
    const estadoId = +this.filterGroup.get('estadoId').value;
    const contrasenaVerificadaId = +this.filterGroup.get('contrasenaVerificadaId').value;
    const twoFactorMetodoId = +this.filterGroup.get('twoFactorMetodoId').value;
    const bloqueoId = +this.filterGroup.get('bloqueoId').value;
    const fechaCreacionInicio = this.filterGroup.get('fechaCreacionInicio').value;
    const fechaCreacionFin = this.filterGroup.get('fechaCreacionFin').value;

    if (estadoId) {
      filter['estadoId'] = estadoId;
    }

    if (contrasenaVerificadaId) {
      filter['contrasenaVerificadaId'] = contrasenaVerificadaId;
    }

    if (twoFactorMetodoId) {
      filter['twoFactorMetodoId'] = twoFactorMetodoId;
    }

    if (bloqueoId) {
      filter['bloqueoId'] = bloqueoId;
    }

    const f1 = getDateNullFromString(fechaCreacionInicio);
    if (f1) {
      filter['fechaCreacionInicio'] = this.getStringYYYYMMDDFromDate(f1);
    }

    const f2 = getDateNullFromString(fechaCreacionFin);
    if (f2) {
      filter['fechaCreacionFin'] = this.getStringYYYYMMDDFromDate(f2);
    }

    return filter;
  }

  private actualizaFiltroEnServicio() {
    const formData = this.filterGroup.value;
    this.service.filtro.estadoId = formData.estadoId;
    this.service.filtro.contrasenaVerificadaId = formData.contrasenaVerificadaId;
    this.service.filtro.twoFactorMetodoId = formData.twoFactorMetodoId;
    this.service.filtro.bloqueoId = formData.bloqueoId;
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
}
