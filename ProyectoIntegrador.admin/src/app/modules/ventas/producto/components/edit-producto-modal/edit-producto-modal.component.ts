import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { Producto } from '../../shared/producto.model';
import { ProductoService } from '../../shared/producto.service';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { TipoMedidaEnum } from '../../shared/tipo-medida.enum';
import { NumeroMixto } from 'src/app/_core/models/numero-mixto.model';
import { TipoProducto } from '../../shared/tipo-producto.model';
import { NumberHelper } from 'src/app/_core/helpers/number.helper';
import { regexNumeroMixtoFraccion } from 'src/app/_core/const/regex.const';

@Component({
  selector: 'app-edit-producto-modal',
  templateUrl: './edit-producto-modal.component.html',
})
export class EditProductoModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: Producto;
  categoria$;
  suplidor$;
  color$;

  public listaTipoProducto: ItemSelect[] = [];
  public listaTipoMedida: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: ProductoService,
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

  get tipoProductoSeleccionado(): TipoProducto {
    const tipoProductoId = this.formGroup.value.tipoProductoId;

    const elemento = this.listaTipoProducto.find(o => +o.id === +tipoProductoId);

    return !elemento ? null : elemento.objeto as TipoProducto;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.suplidor$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.suplidor}`);    
    this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.tipoProducto}`)
      .subscribe(data => this.listaTipoProducto = data as ItemSelect[]);

    const filtroCategoria = ItemSelectService.defaultFilter();
    filtroCategoria.filter.push({ criterio: 'tipoRegistroId', valor: '1'});
    this.categoria$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.categoria}`, filtroCategoria);

    const filtroColor = ItemSelectService.defaultFilter();
    filtroColor.filter.push({ criterio: 'tipoRegistroId', valor: '4'});
    this.color$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.color}`, filtroColor);

    this.llenarListaTipoMedida();
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
        this.vm = item as Producto;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      descripcionCliente: [this.vm.descripcionCliente, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      categoriaId: [this.vm.categoriaId, Validators.compose([Validators.required])],
      suplidorId: [this.vm.suplidorId, Validators.compose([Validators.required])],
      tipoProductoId: [this.vm.tipoProductoId, Validators.compose([Validators.required])],
      colorId: [this.vm.colorId, Validators.compose([Validators.required])],
      tipoMedidaId: [this.vm.tipoMedidaId, Validators.compose([Validators.nullValidator])],
      medidaAncho: [this.vm.medidaAncho, Validators.compose([Validators.nullValidator, Validators.pattern(regexNumeroMixtoFraccion),])],
      medidaAlto: [this.vm.medidaAlto, Validators.compose([Validators.nullValidator, Validators.pattern(regexNumeroMixtoFraccion),])],
    });
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    if (!this.validar()) { return; }

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

  activar(): void {
    if (this.accesosService.puedeActivar('ventas.producto.activar')) {

      this.confirmacion(`¿Está seguro de activar el producto?`, 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk(`Se ha activado el producto`);
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
        this.subscriptions.push(sb);
      });
    }
  }

  inactivar(): void {
    if (this.accesosService.puedeInactivar('ventas.producto.inactivar')) {

      this.confirmacion(`¿Está seguro de inactivar el producto?`, 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk(`Se ha inactivado el producto`);
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.descripcion = formData.descripcion; 
    this.vm.descripcionCliente = formData.descripcionCliente; 
    this.vm.categoriaId = formData.categoriaId; 
    this.vm.suplidorId = formData.suplidorId; 
    this.vm.tipoProductoId = formData.tipoProductoId; 
    this.vm.colorId = formData.colorId; 
    this.vm.tipoMedidaId = formData.tipoMedidaId; 
    this.vm.medidaAnchoString = formData.medidaAncho; 
    this.vm.medidaAltoString = formData.medidaAlto;
    
    const medidaAnchoMixto = new NumeroMixto(formData.medidaAncho);
    const medidaAltoMixto = new NumeroMixto(formData.medidaAlto);

    this.vm.medidaAncho = medidaAnchoMixto.numeroDecimal; 
    this.vm.medidaAlto = medidaAltoMixto.numeroDecimal;
  }

  private getEmty(): Producto{
    return new Producto(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    if (StringHelper.obtenerValorString(this.vm.descripcionCliente) === '') {
      this.mensajeValidacion('Debe especificar la descripción del cliente');
      return false;
    }

    const objSinPrecio = this.vm.listaProductoUnidad.find(o => NumberHelper.obtenerValorNumerico(o.precioVenta) === 0);

    if (objSinPrecio) {
      this.mensajeValidacion(`Debe especificar el precio de venta para la unidad: ${objSinPrecio.unidadDescripcion}`);
      return false;
    }

    return true;
  }

  llenarListaTipoMedida(): void {
    this.listaTipoMedida.push(new ItemSelect({ id: +TipoMedidaEnum.Pulgada, descripcion: 'Pulgadas' }));
    this.listaTipoMedida.push(new ItemSelect({ id: +TipoMedidaEnum.centimetro, descripcion: 'Centímetros' }));
  }
}
