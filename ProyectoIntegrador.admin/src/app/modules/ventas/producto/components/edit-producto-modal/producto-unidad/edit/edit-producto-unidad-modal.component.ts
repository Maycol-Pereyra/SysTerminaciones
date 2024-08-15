import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ProductoUnidad } from '../../../../shared/producto-unidad.model';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-producto-unidad-modal',
  templateUrl: './edit-producto-unidad-modal.component.html'
})
export class EditProductoUnidadComponent extends FormBase implements OnInit, OnDestroy {
  @Input() nuevo: boolean;
  @Input() index: number;
  @Input() vm: ProductoUnidad;
  @Input() listaDetalle: ProductoUnidad[];

  get f() {
    return this.formGroup.controls;
  }

  get fv() {
    return this.formGroup.value;
  }

  get unidadDescripcion() {
    const unidadId = this.formGroup.value.unidadId; 
    
    const unidad = this.listaUnidad.find(o => +o.id === +unidadId)

    return !unidad
      ? ''
      : unidad.descripcion;
  }

  unidad$;

  private listaUnidad: ItemSelect[] = []
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
    this.vm = new ProductoUnidad(this.vm);

    this.unidad$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.unidad}`);

    this.subscriptions.push(
      this.unidad$
      .pipe(
        tap((data: ItemSelect[]) => {
          this.listaUnidad = data;
        })
      )
      .subscribe());

    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      unidadId: [this.vm.unidadId, Validators.compose([Validators.required])],
      precioCompra: [this.vm.precioCompra, Validators.compose([Validators.min(0), Validators.max(99999999.99)])],
      precioVenta: [this.vm.precioVenta, Validators.compose([Validators.min(0), Validators.max(99999999.99)])],
      precioVentaInstalacion: [this.vm.precioVentaInstalacion, Validators.compose([Validators.min(1), Validators.max(99999999.99)])],
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

    if (+formData.unidadId <= 0) {
      this.mensajeValidacion('Debe especificar la unidad.');
      return;
    }

    if (+formData.precioCompra <= 0 && +formData.precioVenta <= 0 && +formData.precioVentaInstalacion <= 0) {
      this.mensajeValidacion('Debe especificar al menos uno de los precios.');
      return;
    }

    //

    this.vm.unidadId = formData.unidadId;
    this.vm.precioCompra = formData.precioCompra;
    this.vm.precioVenta = formData.precioVenta;
    this.vm.precioVentaInstalacion = formData.precioVentaInstalacion;
    this.vm.unidadDescripcion = this.unidadDescripcion;

    this.modal.close(this.vm);
  }
}
