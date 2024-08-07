import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, first, tap } from 'rxjs/operators';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { BaseModel } from '../../../../../_metronic/shared/crud-table';
import { Perfil } from '../../shared/perfil.model';
import { PerfilService } from '../../shared/perfil.service';
import { PerfilAcceso } from '../../shared/perfil-acceso.model';

@Component({
  selector: 'app-edit-perfil-modal',
  templateUrl: './edit-perfil-modal.component.html',
  styleUrls: ['./edit-perfil-modal.component.scss'],
})
export class EditPerfilModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() esParaCopia = false;

  isLoading$;
  seleccionTodos = false;
  vm: Perfil;

  listaAccesoFiltrada: PerfilAcceso [];

  private subscriptions: Subscription[] = [];

  constructor(
    private service: PerfilService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public modal: NgbActiveModal
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadData() {

    let servicio: Observable<BaseModel>;

    if (!this.id || this.id === 0) {
      servicio = this.service.getNuevo();
    } else {
      servicio = this.esParaCopia
        ? this.service.getCopia(this.id)
        : this.service.getItemById(this.id);
    }

    const sb = servicio
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(null);
        })
      ).subscribe((item: Perfil) => {
        this.vm = item;
        this.listaAccesoFiltrada = this.vm.listaAcceso;

        this.loadForm();
      });
    this.subscriptions.push(sb);
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      estaActivo: [this.vm.estaActivo, Validators.compose([Validators.nullValidator])],
      modulo: [''],
      opcion: [''],
      permiso: ['']
    });

    this.subscriptions.push(
      this.formGroup.controls.modulo.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.formGroup.controls.opcion.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(() => this.filter())
    );

    this.subscriptions.push(
      this.formGroup.controls.permiso.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(() => this.filter())
    );

    this.evaluaSeleccionTodos();
  }

  cambio(): void {
    this.evaluaSeleccionTodos();
    this.cdr.detectChanges();
  }

  save() {
    this.prepareVm();

    if (this.vm.descripcion.trim() === '') {
      this.mensajeValidacion('Debe especificar la descripción.');
      return;
    }

    const sbUpdate = this.service
      .update(this.vm)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.mensajeOk('El registro fue realizado correctamente.');
          this.modal.close();
          this.forceReload();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sbUpdate);
  }

  cambioSeleccionTodos(): void {
    setTimeout(() => {
      this.seleccionTodos = !this.seleccionTodos;

      this.listaAccesoFiltrada.forEach(item => {
        item.seleccionado = this.seleccionTodos;
      });

      this.cdr.detectChanges();
    }, 0);
  }

  private forceReload() {
    document.location.reload();
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.descripcion = formData.descripcion;
    this.vm.estaActivo = formData.estaActivo;
  }

  private evaluaSeleccionTodos() {
    let todos = this.listaAccesoFiltrada.length > 0;
    this.listaAccesoFiltrada.forEach(item => {
      if (item.seleccionado === false) {
        todos = false;
      }
    });

    this.seleccionTodos = todos;
  }

  private filter(): void {
    const formData = this.formGroup.value;

    this.listaAccesoFiltrada = this.vm.listaAcceso;

    if (formData.modulo && formData.modulo !== '') {
      this.listaAccesoFiltrada = this.listaAccesoFiltrada
        .filter(o => o.modulo.toLowerCase().indexOf(formData.modulo.toLowerCase()) !== -1);
    }

    if (formData.opcion && formData.opcion !== '') {
      this.listaAccesoFiltrada = this.listaAccesoFiltrada
        .filter(o => o.opcion.toLowerCase().indexOf(formData.opcion.toLowerCase()) !== -1);
    }

    if (formData.permiso && formData.permiso !== '') {
      this.listaAccesoFiltrada = this.listaAccesoFiltrada
        .filter(o => o.permiso.toLowerCase().indexOf(formData.permiso.toLowerCase()) !== -1);
    }

    if (this.estanTodosSeleccionados(this.listaAccesoFiltrada)) {
      this.seleccionTodos = true;
    } else {
      this.seleccionTodos = false;
    }
  }

  private estanTodosSeleccionados(lista: PerfilAcceso []): boolean {
    let estanTodosMarcados = this.listaAccesoFiltrada.length > 0;
    lista.forEach(item => {
      if (item.seleccionado === false) {
        estanTodosMarcados = false;
      }
    });

    return estanTodosMarcados;
  }
}
