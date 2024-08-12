import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { EntidadDireccion } from '../../../../shared/entidad-direccion.model';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { StringHelper } from 'src/app/_core/helpers/string.helper';

@Component({
  selector: 'app-edit-entidad-direccion-modal',
  templateUrl: './edit-entidad-direccion-modal.component.html'
})
export class EditEntidadDireccionComponent extends FormBase implements OnInit, OnDestroy {
  @Input() nuevo: boolean;
  @Input() index: number;
  @Input() vm: EntidadDireccion;
  @Input() listaDetalle: EntidadDireccion[];

  get f() {
    return this.formGroup.controls;
  }

  get fv() {
    return this.formGroup.value;
  }

  pais$;
  provincia$;
  ciudad$;
  sector$;

  private subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    private itemSelectService: ItemSelectService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.vm = new EntidadDireccion(this.vm);

    this.pais$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.pais}`);
    this.provincia$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.provincia}`);
    this.ciudad$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.ciudad}`);
    this.sector$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.sector}`);

    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      calle: [this.vm.calle, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      casa: [this.vm.casa, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      referencia: [this.vm.referencia, Validators.compose([Validators.minLength(1), Validators.maxLength(250)])],
      paisId: [this.vm.paisId, Validators.compose([Validators.required])],
      provinciaId: [this.vm.provinciaId, Validators.compose([Validators.required])],
      ciudadId: [this.vm.ciudadId, Validators.compose([Validators.required])],
      sectorId: [this.vm.sectorId, Validators.compose([Validators.required])],
    });
  }

  save() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      this.mensajeValidacion('Debe de completar los datos requeridos.');
      return;
    }

    const formData = this.formGroup.value;

    if (+formData.relacionId <= 0) {
      this.mensajeValidacion('Debe de especificar la relación.');
      return;
    }

    if (+formData.paisId <= 0) {
      this.mensajeValidacion('Debe especificar el país.');
      return;
    }

    if (+formData.provinciaId <= 0) {
      this.mensajeValidacion('Debe especificar la provincia.');
      return;
    }

    if (+formData.ciudadId <= 0) {
      this.mensajeValidacion('Debe especificar la ciudad.');
      return;
    }

    if (+formData.sectorId <= 0) {
      this.mensajeValidacion('Debe especificar el sector.');
      return;
    }

    if (StringHelper.obtenerValorString(formData.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción.');
      return;
    }

    if (StringHelper.obtenerValorString(formData.calle) === '') {
      this.mensajeValidacion('Debe especificar la calle.');
      return;
    }

    if (StringHelper.obtenerValorString(formData.casa) === '') {
      this.mensajeValidacion('Debe especificar la casa.');
      return;
    }
   

    //

    this.vm.descripcion = formData.descripcion;
    this.vm.calle = formData.calle;
    this.vm.casa = formData.casa;
    this.vm.referencia = formData.referencia;
    this.vm.paisId = formData.paisId;
    this.vm.provinciaId = formData.provinciaId;
    this.vm.ciudadId = formData.ciudadId;
    this.vm.sectorId = formData.sectorId;
    this.vm.estaActivo = this.nuevo ? true : this.vm.estaActivo;
    this.vm.fechaCreacion = this.nuevo ? new Date() : this.vm.fechaCreacion;

    this.modal.close(this.vm);
  }



  private n(value: number): number {
    if (!value || value === undefined || value === null) {
      return 0;
    }

    return +value;
  }
}
