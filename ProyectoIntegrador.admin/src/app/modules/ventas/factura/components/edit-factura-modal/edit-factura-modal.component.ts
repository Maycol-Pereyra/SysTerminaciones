import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { Factura } from '../../shared/factura.model';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelectFilter } from 'src/app/_core/item-select/item-select-filter';
import { NumeroMixto } from 'src/app/_core/models/numero-mixto.model';
import { FacturaDetalle } from '../../shared/factura-detalle.model';
import { NumeroMixtoHelper } from 'src/app/_core/helpers/numero-misxto-helper';
import { FacturaService } from '../../shared/factura.service';

@Component({
  selector: 'app-edit-factura-modal',
  templateUrl: './edit-factura-modal.component.html',
})
export class EditFacturaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  public detalleGroup: FormGroup;
  
  isLoading$;
  vm: Factura;
  esParaEditar = false;
  index: number;

  cliente$;
  producto$;
  estado$;
  unidad$  = new BehaviorSubject<ItemSelect[]>([]);
  direccion$ = new BehaviorSubject<ItemSelect[]>([]);
  telefono$ = new BehaviorSubject<ItemSelect[]>([]);

  public listaProducto: ItemSelect[] = [];
  public listaUnidad: ItemSelect[] = [];
  public listaEstado: ItemSelect[] = [];
  public listaDetalle: FacturaDetalle[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: FacturaService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    private itemSelectService: ItemSelectService
    ) {
    super();
  }

  get f() {
    return this.formGroup.controls;
  }

  get unidadSeleccionada() {
    const unidadId = this.detalleGroup.value.unidadProductoId;

    const elemento = this.listaUnidad.find(o => +o.id === +unidadId)

    return !elemento ? null : elemento;
  }

  get productoSeleccionado() {
    const productoId = this.detalleGroup.value.productoId;

    const elemento = this.listaProducto.find(o => +o.id === +productoId)

    return !elemento ? null : elemento;
  }

  get tipoProductoSeleccionado() {
    return !this.productoSeleccionado ? null : this.productoSeleccionado.objeto.tipoProducto;
  }

  get productoDescripcion() {
    const productoId = this.detalleGroup.value.productoId;

    const elemento = this.listaProducto.find(o => +o.id === +productoId)

    return !elemento ? '' : elemento.descripcion;
  }

  get unidadDescripcion() {
    const unidadId = this.detalleGroup.value.unidadProductoId;

    const elemento = this.listaUnidad.find(o => +o.id === +unidadId)

    return !elemento ? '' : elemento.descripcion;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.cliente$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.cliente}`);

    this.producto$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.producto}`);
    this.producto$.subscribe(data => this.listaProducto = data as ItemSelect[])

    const filtroEstado = ItemSelectService.defaultFilter();
    filtroEstado.filter.push({ criterio: 'tipoDefectoId', valor: '17'});
    this.estado$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.estadoSolicitudTomaMedida}`, filtroEstado);
    this.estado$.subscribe(data => this.listaEstado = data as ItemSelect[]);

    this.loadData();
  }

  loadData() {
    if (!this.id || this.id === 0) {
      this.vm = this.getEmty();
      this.loadForm();
    } else {
      const sb = this.service.getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.getEmty());
        })
      ).subscribe(item => {
        this.vm = item as Factura;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      clienteId: [this.vm.clienteId, Validators.compose([Validators.required])],
      telefonoId: [this.vm.telefonoId, Validators.compose([Validators.required])],
      direccionId: [this.vm.direccionId, Validators.compose([Validators.nullValidator])],
      nota: [this.vm.nota, Validators.compose([Validators.nullValidator, Validators.minLength(0), Validators.maxLength(250)])],
      llevaEnvio: [this.vm.llevaEnvio, Validators.compose([Validators.nullValidator])],
      llevaInstalacion: [this.vm.llevaInstalacion, Validators.compose([Validators.nullValidator])],
    });

    this.detalleGroup = this.fb.group({
      productoId: [null, Validators.compose([Validators.required])],
      unidadProductoId: [null, Validators.compose([Validators.required])],
      medidaAncho: ['', Validators.compose([Validators.nullValidator])],
      medidaAlto: ['', Validators.compose([Validators.nullValidator])],
      cantidad: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(99999999)])],
      esMedidaAproximada: [false, Validators.compose([Validators.nullValidator])]
    });

    for (const item of this.vm.listaDetalle) {
      const producto = this.listaProducto.find(o => +o.id === +item.productoId)
      const productoDescripcion = !producto ? '' : producto.descripcion;

      const unidad = this.listaUnidad.find(o => +o.id === +item.unidadProductoId)
      const unidadDescripcion = !unidad ? '' : unidad.descripcion;

      const medidaAnchoMixto = new NumeroMixto(item.medidaAncho);
      const medidaAltoMixto = new NumeroMixto(item.medidaAlto);

      this.listaDetalle.push(new FacturaDetalle({
        facturaId: item.facturaId,
        productoId: item.productoId,
        productoDescripcion: productoDescripcion,
        unidadProductoId: item.unidadProductoId,
        unidadProductoDescripcion: unidadDescripcion,
        medidaAncho: item.medidaAncho,
        medidaAnchoString: medidaAnchoMixto.numeroString,
        medidaAlto: item.medidaAlto,
        medidaAltoString: medidaAltoMixto.numeroString,
        tipoMedidaId: item.tipoMedidaId,
        cantidad: item.cantidad,
        cantidadEntregada: item.cantidadEntregada,
        precioUnitario: item.precioUnitario,
        impuesto: item.impuesto,
        descuento: item.descuento
      }));
    }

    this.formGroup.get('clienteId').valueChanges.subscribe(val => {
      this.cambioCliente(val);
      this.cd.detectChanges();
    });

    this.subscriptions.push(
      this.detalleGroup.controls.productoId.valueChanges.subscribe(val => {
        this.cambioProducto(val);
        this.cd.detectChanges();
      })
    );
  }

  save() {
    this.prepareVm(false);
    this.edit();
  }

  saveDefinitivo() {
    //TODO: esto hay que ver si lo dejo aqui o lo muevo a la siguiente pantalla
    this.confirmacion('¿Está seguro de completar la cotización, una vez completada no se va a poder editar?', 'Confirmación', () => {
      this.prepareVm(true);
      this.edit();
    });
  }

  edit() {
    const sbUpdate = this.service.update(this.vm)
    .subscribe((res: any) => {
      if (res && res.id) {
        this.mensajeOk('El registro fue realizado correctamente.');
        this.modal.close();
      } else {
        this.mensajeValidacion(res.msg);
      }
    });
    this.subscriptions.push(sbUpdate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  public esInvalido(controlName: string): boolean {
    const control = this.detalleGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  public tieneError(validation: string, controlName: string) {
    const control = this.detalleGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  editar(): void {
    const elemento = this.listaDetalle[this.index];
    
    const formData = this.detalleGroup.value;

    elemento.productoId = formData.productoId;
    elemento.medidaAnchoString = formData.medidaAncho;
    elemento.medidaAltoString = formData.medidaAlto;
    elemento.cantidad = formData.cantidad;

    this.esParaEditar = false;

    this.limpiarCampos();

    this.cd.detectChanges();
  }

  public getPrecioTotal(): number {
    if (!this.listaDetalle || this.listaDetalle.length === 0) {
      return 0;
    }

    let total = 0;

    for (const item of this.listaDetalle) {
      total += item.precioUnitario;
    }

    return total;
  }

  public agregar(): void {
    if (!this.validar()) { return; }
    const formData = this.formGroup.value;
    const llevaInstalacion = formData.llevaInstalacion;
    
    const detalleData = this.detalleGroup.value;
    const productoId = detalleData.productoId;
    const unidadProductoId = detalleData.unidadProductoId;
    const medidaAncho = detalleData.medidaAncho;
    const medidaAlto = detalleData.medidaAlto;
    const cantidad = detalleData.cantidad;
    const medidaAnchoMixto = new NumeroMixto(medidaAncho);
    const medidaAltoMixto = new NumeroMixto(medidaAlto);
    
    const elemento = this.listaDetalle.find(o =>
      +o.productoId === +productoId &&
      o.medidaAncho === medidaAncho &&
      o.medidaAlto === medidaAlto
    );

    if (!elemento) {
      const precioUnitario = llevaInstalacion
        ? this.unidadSeleccionada.objeto.precioVentaInstalacion
        : this.unidadSeleccionada.objeto.precioVenta; 

      const precio = NumeroMixtoHelper.obtenerPrecioProducto(
        this.tipoProductoSeleccionado.id,
        medidaAncho,
        medidaAlto,
        cantidad,
        precioUnitario 
      );

      const nuevoElemento = new FacturaDetalle({
        productoId,
        medidaAnchoString: medidaAncho,
        medidaAltoString: medidaAlto,
        medidaAncho: medidaAnchoMixto.numeroDecimal,
        medidaAlto: medidaAltoMixto.numeroDecimal,
        tipoMedidaId: 1,
        cantidad,
        cantidadEntregada: 0,
        productoDescripcion: this.productoDescripcion,
        unidadProductoId: unidadProductoId,
        unidadProductoDescripcion: this.unidadDescripcion,
        precioUnitario: precio
      });

      this.listaDetalle.push(nuevoElemento);

      this.limpiarCampos();

      this.cd.detectChanges();

      return;
    }

    elemento.cantidad += cantidad;
    
    this.limpiarCampos();
    
    this.cd.detectChanges();
  }

  public getProductoDescripcion(row: any): string {
    const elemento = this.listaProducto.find(o => +o.id === +row.productoId)

    return !elemento ? '' : elemento.descripcion;
  }

  public getUnidadDescripcion(row: any): string {
    const elemento = this.listaUnidad.find(o => +o.id === +row.unidadProductoId)

    return !elemento ? '' : elemento.descripcion;
  }

  public getNumeroMixto(medida: number): string {
    const medidaString = new NumeroMixto(medida);

    return medidaString.numeroString;
  }

  private limpiarCampos(): void {
    this.detalleGroup.controls.medidaAncho.setValue('');
    this.detalleGroup.controls.medidaAlto.setValue('');
    this.detalleGroup.controls.cantidad.setValue(1);
  }

  private validar(): boolean {
    const formData = this.detalleGroup.value;
    const productoId = formData.productoId;
    const medidaAncho = formData.medidaAncho;
    const medidaAlto = formData.medidaAlto;
    const cantidad = formData.cantidad;

    if (+productoId === 0) {
      this.mensajeValidacion('Debe especificar el producto');
      return false;
    }

    if (!!this.tipoProductoSeleccionado && (this.tipoProductoSeleccionado.usaMedidaAncho || this.tipoProductoSeleccionado.usaMedidaAlto)) {
      if (this.tipoProductoSeleccionado.usaMedidaAncho && medidaAncho === '') {
        this.mensajeValidacion('Debe especificar la medida de ancho');
        return false;
      }
  
      if (this.tipoProductoSeleccionado.usaMedidaAlto && medidaAlto === '') {
        this.mensajeValidacion('Debe especificar le medida de alto');
        return false;
      }
    }

    if (+cantidad === 0) {
      this.mensajeValidacion('Debe especificar la cantidad');
      return false;
    }

    return true;
  }

  private prepareVm(esSaveDefinitivo: boolean) {
    const formData = this.formGroup.value;
    this.vm.clienteId = formData.clienteId;
    this.vm.telefonoId = formData.telefonoId;
    this.vm.direccionId = formData.direccionId;
    this.vm.nota = formData.nota;
    this.vm.llevaEnvio = formData.llevaEnvio;
    this.vm.llevaInstalacion = formData.llevaInstalacion;
    this.vm.monto = this.getPrecioTotal();

    if (this.listaDetalle.length <= 0) {
      this.mensajeValidacion('Debe de insertar al menos una medida');
      return;
    }
    
    const estadoId = esSaveDefinitivo
      ? this.listaEstado.find(o => o.descripcion === 'Entregada al Cliente').id
      : this.listaEstado.find(o => o.descripcion === 'En Proceso').id;

    this.vm.estadoId = +estadoId;

    for (const item of this.listaDetalle) {
      const medidaAnchoMixto = new NumeroMixto(item.medidaAnchoString);
      const medidaAltoMixto = new NumeroMixto(item.medidaAltoString);

      const elemento = new FacturaDetalle({
        facturaId: item.facturaId,
        productoId: item.productoId,
        productoDescripcion: item.productoDescripcion,
        unidadProductoId: item.unidadProductoId,
        unidadProductoDescripcion: item.unidadProductoDescripcion,
        medidaAncho: item.medidaAncho,
        medidaAnchoString: medidaAnchoMixto.numeroString,
        medidaAlto: item.medidaAlto,
        medidaAltoString: medidaAltoMixto.numeroString,
        tipoMedidaId: item.tipoMedidaId,
        cantidad: item.cantidad,
        cantidadEntregada: item.cantidadEntregada,
        precioUnitario: item.precioUnitario,
        impuesto: item.impuesto,
        descuento: item.descuento
      });

      this.vm.listaDetalle.push(elemento);
    }
  }

  private getEmty(): Factura{
    return new Factura(null);
  }

  private cambioCliente(val: any) {
    const filter = ItemSelectService.defaultFilter();
    filter.filter.push({ criterio: 'clienteId', valor: `${val}` } as ItemSelectFilter);

    const direccionId = this.formGroup.get('direccionId');
    direccionId.setValue(null);

    this.direccion$.next([]);

    const sb = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.direccion}`, filter)
      .subscribe(data => {
        this.direccion$.next(data);
      });
    this.subscriptions.push(sb);

    const telefonoId = this.formGroup.get('telefonoId');
    telefonoId.setValue(null);

    this.telefono$.next([]);

    const sb2 = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.telefono}`, filter)
      .subscribe(data => {
        this.telefono$.next(data);
      });
    this.subscriptions.push(sb2);
  }

  private cambioProducto(val: any): void {
    const filter = ItemSelectService.defaultFilter();
    filter.filter.push({ criterio: 'productoId', valor: `${val}` } as ItemSelectFilter);
    filter.filter.push({ criterio: 'cargarSoloUnidadVenta', valor: `${true}` } as ItemSelectFilter);

    const unidadProductoId = this.detalleGroup.get('unidadProductoId');
    unidadProductoId.setValue(null);

    this.unidad$.next([]);

    const sb = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.unidadProducto}`, filter)
      .subscribe(data => {
        this.unidad$.next(data);
        this.listaUnidad = data;
      });
    this.subscriptions.push(sb);


    const medidaAncho = this.detalleGroup.get('medidaAncho');
    medidaAncho.setValidators([Validators.required]);
    medidaAncho.updateValueAndValidity();

    const medidaAlto = this.detalleGroup.get('medidaAlto');
    medidaAlto.setValidators([Validators.required]);
    medidaAlto.updateValueAndValidity();
  }

}
