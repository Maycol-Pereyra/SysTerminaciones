import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { EntidadTelefono } from '../../../../shared/entidad-telefono.model';
import { maskTelefono } from 'src/app/_core/const/formato-mascara';

@Component({
  selector: 'app-edit-entidad-telefono-modal',
  templateUrl: './edit-entidad-telefono-modal.component.html'
})
export class EditEntidadTelefonoComponent extends FormBase implements OnInit, OnDestroy {
  @Input() nuevo: boolean;
  @Input() index: number;
  @Input() vm: EntidadTelefono;
  @Input() listaDetalle: EntidadTelefono[];

  maskTelefono = maskTelefono;

  get f() {
    return this.formGroup.controls;
  }

  get fv() {
    return this.formGroup.value;
  }

  private subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.vm = new EntidadTelefono(this.vm);
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      telefono: [this.vm.telefono, Validators.compose([
        Validators.required,
        Validators.pattern('[(]{1}[0123456789]{3}[)]{1}[0123456789]{3}[-]{1}[0123456789]{4}')
      ])],
    });
  }

  save() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      this.mensajeValidacion('Debe de completar los datos requeridos.');
      return;
    }

    const formData = this.formGroup.value;

    if (StringHelper.obtenerValorString(formData.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción.');
      return;
    }

    if (StringHelper.obtenerValorString(formData.telefono) === '') {
      this.mensajeValidacion('Debe especificar el número telefónico.');
      return;
    }

    //

    this.vm.descripcion = formData.descripcion;
    this.vm.telefono = formData.telefono
    this.vm.estaActivo = this.nuevo ? true : this.vm.estaActivo;
    this.vm.fechaCreacion = this.nuevo ? new Date() : this.vm.fechaCreacion;

    this.modal.close(this.vm);
  }
}
