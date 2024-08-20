import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { ProductoDetalleProduccion } from '../../../../shared/producto-detalle-produccion.model';
import { ItemSelectFilter } from 'src/app/_core/item-select/item-select-filter';

@Component({
  selector: 'app-edit-producto-detalle-produccion-modal',
  templateUrl: './edit-producto-detalle-produccion-modal.component.html'
})
export class EditProductoDetalleProduccionComponent extends FormBase implements OnInit, OnDestroy {
  @Input() nuevo: boolean;
  @Input() index: number;
  @Input() productoId: number;
  @Input() vm: ProductoDetalleProduccion;

  get f() {
    return this.formGroup.controls;
  }

  get productoProduccionDescripcion() {
    const productoProduccionId = this.formGroup.value.productoProduccionId; 
    
    const productoProduccion = this.listaProductoProduccion.find(o => +o.id === +productoProduccionId)

    return !productoProduccion
      ? ''
      : productoProduccion.descripcion;
  }

  get unidadProduccionDescripcion() {
    const unidadProduccionId = this.formGroup.value.unidadProduccionId; 
    
    const unidadProduccion = this.listaUnidadProduccion.find(o => +o.id === +unidadProduccionId)

    return !unidadProduccion
      ? ''
      : unidadProduccion.descripcion;
  }

  productoProduccion$;
  unidadProduccion$ = new BehaviorSubject<ItemSelect[]>([]);

  private listaProductoProduccion: ItemSelect[] = []
  private listaUnidadProduccion: ItemSelect[] = []
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
    this.vm = new ProductoDetalleProduccion(this.vm);

    const filtroProducto = ItemSelectService.defaultFilter();
    filtroProducto.filter.push({ criterio: 'productoExcluirId', valor: `${this.productoId}`});
    this.productoProduccion$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.producto}`, filtroProducto);
    this.productoProduccion$.subscribe(data => this.listaProductoProduccion = data as ItemSelect[]);

    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      productoProduccionId: [this.vm.productoProduccionId, Validators.compose([Validators.required])],
      unidadProduccionId: [this.vm.unidadProduccionId, Validators.compose([Validators.required])],
      cantidad: [this.vm.cantidad, Validators.compose([Validators.min(1), Validators.max(99999999.99)])],
    });

    this.subscriptions.push(
      this.formGroup.controls.productoProduccionId.valueChanges.subscribe(val => {
        this.cambioProducto(val);
        this.cdr.detectChanges();
      })
    );
  }

  save() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      this.mensajeValidacion('Debe de completar los datos requeridos.');
      return;
    }

    const formData = this.formGroup.value;

    //

    this.vm.productoProduccionId = formData.productoProduccionId;
    this.vm.productoProduccionDescripcion = this.productoProduccionDescripcion;
    this.vm.unidadProduccionId = formData.unidadProduccionId;
    this.vm.unidadProduccionDescripcion = this.unidadProduccionDescripcion;
    this.vm.cantidad = formData.cantidad;

    this.modal.close(this.vm);
  }

  private cambioProducto(val: any): void {
    const filter = ItemSelectService.defaultFilter();
    filter.filter.push({ criterio: 'productoId', valor: `${val}` } as ItemSelectFilter);

    const unidadProduccionId = this.formGroup.get('unidadProduccionId');
    unidadProduccionId.setValue(null);

    this.unidadProduccion$.next([]);

    const sb = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.unidadProducto}`, filter)
      .subscribe(data => {
        this.unidadProduccion$.next(data);
        this.listaUnidadProduccion = data;
      });
    this.subscriptions.push(sb);
  }
}
