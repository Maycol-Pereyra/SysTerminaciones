import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { Vehiculo } from '../../shared/vehiculo.model';
import { VehiculoService } from '../../shared/vhiculo.service';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';

@Component({
  selector: 'app-edit-vehiculo-modal',
  templateUrl: './edit-vehiculo-modal.component.html',
})
export class EditVehiculoModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: Vehiculo;
  estados$;
  unidades$;
  colores$;

  public listaSolicitud: ItemSelect[] = [];
  public listaTipoProducto: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: VehiculoService,
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

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    
    this.estados$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.estadoVehiculo}`);
    this.unidades$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.unidad}`);
    const filtroUsuarioCore = ItemSelectService.defaultFilter();
    filtroUsuarioCore.filter.push({ criterio: 'tipoRegistroId', valor: '4'});
    this.colores$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.color}`, filtroUsuarioCore);

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
        this.vm = item as Vehiculo;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      marca: [this.vm.marca, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      modelo: [this.vm.modelo, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      anoFabricacion: [this.vm.anoFabricacion, Validators.compose([Validators.required, Validators.min(1), Validators.max(9999)])],
      placa: [this.vm.placa, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      colorId: [this.vm.colorId, Validators.compose([Validators.required])],
      kilometraje: [this.vm.kilometraje, Validators.compose([Validators.required, Validators.min(1), Validators.max(99999999.99)])],
      capacidadCarga: [this.vm.capacidadCarga, Validators.compose([Validators.required, Validators.min(1), Validators.max(99999999.99)])],
      unidadCargaId: [this.vm.unidadCargaId, Validators.compose([Validators.required])],
      estadoId: [this.vm.estadoId, Validators.compose([Validators.required])],
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  actualizarDescripcion(id: number) {
    const value = this.listaSolicitud.find(o => o.id === id);

    if (value) {
      return value.descripcion;
    }
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.marca = formData.marca;
    this.vm.modelo = formData.modelo;
    this.vm.anoFabricacion = formData.anoFabricacion;
    this.vm.placa = formData.placa;
    this.vm.colorId = formData.colorId;
    this.vm.kilometraje = formData.kilometraje;
    this.vm.capacidadCarga = formData.capacidadCarga;
    this.vm.unidadCargaId = formData.unidadCargaId;
    this.vm.estadoId = formData.estadoId;
  }

  private getEmty(): Vehiculo{
    return new Vehiculo(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.marca) === '') {
      this.mensajeValidacion('Debe especificar la marca');
      return false;
    }

    if (StringHelper.obtenerValorString(this.vm.modelo) === '') {
      this.mensajeValidacion('Debe especificar el modelo');
      return false;
    }

    if (StringHelper.obtenerValorString(this.vm.placa) === '') {
      this.mensajeValidacion('Debe especificar la placa');
      return false;
    }

    return true;
  }

}
