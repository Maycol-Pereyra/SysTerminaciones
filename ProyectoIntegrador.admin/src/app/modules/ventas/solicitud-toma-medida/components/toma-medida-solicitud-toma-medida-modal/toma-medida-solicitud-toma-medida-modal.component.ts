import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { SolicitudTomaMedida } from '../../shared/solicitud-toma-medida.model';
import { SolicitudTomaMedidaService } from '../../shared/solicitud-toma-medida.service';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelectState } from 'src/app/_core/item-select/item-select-state';
import { SolicitudTomaMedidaDetalle } from '../../shared/solicitud-toma-medida-detalle.model';
import { JsonHelper } from 'src/app/_core/helpers/json.helper';
import { NumeroMixto } from 'src/app/_core/models/numero-mixto.model';
import { ItemSelectFilter } from 'src/app/_core/item-select/item-select-filter';

@Component({
  selector: 'app-toma-medida-solicitud-toma-medida-modal',
  templateUrl: './toma-medida-solicitud-toma-medida-modal.component.html',
})
export class TomaMedidaSolicitudTomaMedidaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  public filterGroup: FormGroup;

  isLoading$;
  vm: SolicitudTomaMedida;
  esParaEditar = false;
  index: number;
  categoria$;
  producto$;
  estado$;
  unidad$;

  filtro: ItemSelectState

  public listaDetalle: SolicitudTomaMedidaDetalle[] = [];
  public listaProductos: ItemSelect[] = [];
  public listaUnidad: ItemSelect[] = [];
  public listaEstado: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: SolicitudTomaMedidaService,
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

  get productoDescripcion() {
    const productoId = this.formGroup.value.productoId;

    const elemento = this.listaProductos.find(o => +o.id === +productoId)

    return !elemento ? '' : elemento.descripcion;
  }

  get unidadDescripcion() {
    const unidadId = this.formGroup.value.unidadId;

    const elemento = this.listaUnidad.find(o => +o.id === +unidadId)

    return !elemento ? '' : elemento.descripcion;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.categoria$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.categoria}`);
    
    this.producto$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.producto}`);
    this.producto$.subscribe(data => this.listaProductos = data as ItemSelect[]);

    const filtroEstado = ItemSelectService.defaultFilter();
    filtroEstado.filter.push({ criterio: 'tipoRegistroId', valor: '26'});
    this.estado$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.estadoSolicitudTomaMedida}`, filtroEstado);
    this.estado$.subscribe(data => this.listaEstado = data as ItemSelect[]);

    this.loadData();
  }

  loadData() {
    const sb = this.service.getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(null);
        })
      ).subscribe(item => {
        this.vm = item as SolicitudTomaMedida;
        this.loadForm();
      });
      this.subscriptions.push(sb);
  }

  loadForm() {
    this.formGroup = this.fb.group({
      productoId: [null, Validators.compose([Validators.required])],
      unidadProductoId: [null, Validators.compose([Validators.required])],
      medidaAncho: ['', Validators.compose([Validators.nullValidator])],
      medidaAlto: ['', Validators.compose([Validators.nullValidator])],
      esMedidaAproximada: [false, Validators.compose([Validators.nullValidator])],
      cantidad: [1, Validators.compose([Validators.required, Validators.min(0), Validators.max(99999999)])],
      nota: ['', Validators.compose([Validators.nullValidator, Validators.minLength(1), Validators.maxLength(250)])],
    });

    for (const item of this.vm.listaDetalle) {
      const producto = this.listaProductos.find(o => +o.id === +item.productoId)
      const productoDescripcion = !producto ? '' : producto.descripcion;

      const unidad = this.listaUnidad.find(o => +o.id === +item.unidadProductoId)
      const unidadDescripcion = !unidad ? '' : unidad.descripcion;

      const medidaAnchoMixto = new NumeroMixto(item.medidaAncho);
      const medidaAltoMixto = new NumeroMixto(item.medidaAlto);

      this.listaDetalle.push(new SolicitudTomaMedidaDetalle({
        solicitudTomaMedidaId: item.solicitudTomaMedidaId,
        tomaMedidaId: item.tomaMedidaId,
        productoId: item.productoId,
        productoDescripcion: productoDescripcion,
        unidadProductoId: item.unidadProductoId,
        unidadProductoDescripcion: unidadDescripcion,
        cantidad: item.cantidad,
        medidaAncho: item.medidaAncho,
        medidaAnchoString: medidaAnchoMixto.numeroString,
        medidaAlto: item.medidaAlto,
        medidaAltoString: medidaAltoMixto.numeroString,
        tipoMedidaId: item.tipoMedidaId,
        esMedidaAproximada: item.esMedidaAproximada,
        nota: item.nota,
      }));
    }

    this.subscriptions.push(
      this.formGroup.controls.productoId.valueChanges.subscribe(val => {
        this.cambioProducto(val);
        this.cd.detectChanges();
      })
    );
  }

  save(esSaveDefinitivo: boolean = false) {
    if (this.listaDetalle.length <= 0) {
      this.mensajeValidacion('Debe de insertar al menos una medida');
      return;
    }
    
    const estadoId = esSaveDefinitivo
      ? this.listaEstado.find(o => o.descripcion === 'Concluido').id
      : this.listaEstado.find(o => o.descripcion === 'En Proceso').id;

    this.vm.estadoId = +estadoId;

    for (const item of this.listaDetalle) {
      const medidaAnchoMixto = new NumeroMixto(item.medidaAnchoString);
      const medidaAltoMixto = new NumeroMixto(item.medidaAltoString);

      const elemento = new SolicitudTomaMedidaDetalle({
        productoId: item.productoId,
        medidaAncho: medidaAnchoMixto.numeroDecimal,
        medidaAlto: medidaAltoMixto.numeroDecimal,
        esMedidaAproximada: item.esMedidaAproximada,
        cantidad: item.cantidad,
        nota: item.nota,
        productoDescripcion: this.productoDescripcion,
        unidadProductoId: item.unidadProductoId,
        unidadProductoDescripcion: this.unidadDescripcion,
        tipoMedidaId: 1 // TODO: fijo hasta desarrollar el tema
      });

      this.vm.listaDetalle.push(elemento);
    }

    const mensaje = esSaveDefinitivo 
      ? 'Los cambios fueron registrados'
      : 'La toma de medida fue completada';

    const sbUpdate = this.service.tomarMedida(this.vm)
      .subscribe((res: any) => { 
        this.mensajeOk(mensaje);
        this.modal.close();
      });
    this.subscriptions.push(sbUpdate);
  }

  editar(): void {
    const elemento = this.listaDetalle[this.index];
    
    const formData = this.formGroup.value;

    elemento.productoId = formData.productoId;
    elemento.medidaAnchoString = formData.medidaAncho;
    elemento.medidaAltoString = formData.medidaAlto;
    elemento.esMedidaAproximada = formData.esMedidaAproximada;
    elemento.cantidad = formData.cantidad;
    elemento.nota = formData.nota;

    this.esParaEditar = false;

    this.limpiarCampos();

    this.cd.detectChanges();
  }

  seleccionaParaEditar(row: SolicitudTomaMedidaDetalle) {
    this.index = this.listaDetalle.indexOf(row);
    this.esParaEditar = true;

    this.formGroup.controls.productoId.setValue(row.productoId);
    this.formGroup.controls.unidadProductoId.setValue(row.unidadProductoId);
    this.formGroup.controls.medidaAncho.setValue(row.medidaAnchoString);
    this.formGroup.controls.medidaAlto.setValue(row.medidaAltoString);
    this.formGroup.controls.esMedidaAproximada.setValue(row.esMedidaAproximada);
    this.formGroup.controls.cantidad.setValue(row.cantidad);
    this.formGroup.controls.nota.setValue(row.nota);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  search(searchTerm: string) {
    this.service.patchState({ searchTerm });
  }

  public agregar(): void {
    if (!this.validar()) { return; }

    const formData = this.formGroup.value;
    const productoId = formData.productoId;
    const medidaAncho = formData.medidaAncho;
    const medidaAlto = formData.medidaAlto;
    const esMedidaAproximada = formData.esMedidaAproximada;
    const cantidad = formData.cantidad;
    const nota = formData.nota;

    const elemento = this.listaDetalle.find(o =>
      +o.productoId === +productoId &&
      o.medidaAncho === medidaAncho &&
      o.medidaAlto === medidaAlto &&
      o.esMedidaAproximada === esMedidaAproximada
    );

    if (!elemento) {
      const nuevoElemento = new SolicitudTomaMedidaDetalle({
        productoId,
        medidaAnchoString: medidaAncho,
        medidaAltoString: medidaAlto,
        esMedidaAproximada,
        cantidad,
        nota,
        productoDescripcion: this.productoDescripcion,
        unidadDescripcion: this.unidadDescripcion
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

  private cambioProducto(val: any): void {
    const filter = ItemSelectService.defaultFilter();
    filter.filter.push({ criterio: 'productoId', valor: `${val}` } as ItemSelectFilter);

    const unidadProductoId = this.filterGroup.get('unidadProductoId');
    unidadProductoId.setValue(null);

    this.unidad$.next([]);

    const sb = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.unidadProducto}`, filter)
      .subscribe(data => {
        this.unidad$.next(data);
        this.listaUnidad = data;
      });
    this.subscriptions.push(sb);
  }

  private limpiarCampos(): void {
    this.formGroup.controls.medidaAncho.setValue('');
    this.formGroup.controls.medidaAlto.setValue('');
    this.formGroup.controls.esMedidaAproximada.setValue(false);
    this.formGroup.controls.cantidad.setValue(0);
    this.formGroup.controls.nota.setValue('');
  }

  private validar(): boolean {
    const formData = this.formGroup.value;
    const productoId = formData.productoId;
    const medidaAncho = formData.medidaAncho;
    const medidaAlto = formData.medidaAlto;
    const cantidad = formData.cantidad;

    if (+productoId === 0) {
      this.mensajeValidacion('Debe especificar el producto');
      return false;
    }

    if (medidaAncho === '') {
      this.mensajeValidacion('Debe especificar la medida de ancho');
      return false;
    }

    if (medidaAlto === '') {
      this.mensajeValidacion('Debe especificar le medida de alto');
      return false;
    }

    if (+cantidad === 0) {
      this.mensajeValidacion('Debe especificar la cantidad');
      return false;
    }

    return true;
  }

  // private formaFiltroBusqueda(val: string): void {
  //   this.filtro = ItemSelectService.defaultFilter();
  //   this.filtro.criterio = val;

  //   this.filtrarProducto();
  // }

  // private filtrarProducto(val: any) {
  //   this.producto$.next([]);

  //   const sb = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.producto}`, filter)
  //     .subscribe(data => {
  //       this.producto$.next(data);
  //     });
  //   this.subscriptions.push(sb);
  // }
}
