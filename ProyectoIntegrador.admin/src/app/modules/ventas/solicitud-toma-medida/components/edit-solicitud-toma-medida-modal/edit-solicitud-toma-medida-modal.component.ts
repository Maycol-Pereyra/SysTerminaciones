import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { SolicitudTomaMedida } from '../../shared/solicitud-toma-medida.model';
import { SolicitudTomaMedidaService } from '../../shared/solicitud-toma-medida.service';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelectFilter } from 'src/app/_core/item-select/item-select-filter';

@Component({
  selector: 'app-edit-solicitud-toma-medida-modal',
  templateUrl: './edit-solicitud-toma-medida-modal.component.html',
})
export class EditSolicitudTomaMedidaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: SolicitudTomaMedida;
  cliente$;
  direccion$  = new BehaviorSubject<ItemSelect[]>([]);
  empleado$;
  vehiculo$;

  public listaTipoMedida: ItemSelect[] = [];
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

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.cliente$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.cliente}`);
    this.empleado$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.empleado}`);
    this.vehiculo$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.vehiculo}`);

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
        this.vm = item as SolicitudTomaMedida;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      clienteId: [this.vm.clienteId, Validators.compose([Validators.required])],
      direccionId: [this.vm.direccionId, Validators.compose([Validators.required])],
      fechaCompromisoTomaMedida: [this.getFechaParaComponente(this.vm.fechaCompromisoTomaMedida), Validators.compose([Validators.nullValidator])],
      empleadoAsignadoId: [this.vm.empleadoAsignadoId, Validators.compose([Validators.nullValidator])],
      vehiculoAsignadoId: [this.vm.vehiculoAsignadoId, Validators.compose([Validators.nullValidator])],
    });

    this.formGroup.get('clienteId').valueChanges.subscribe(val => {
      this.cambioCliente(val);
      this.cd.detectChanges();
    });

    if (+this.vm.clienteId > 0) {
      const direccionFilter = ItemSelectService.defaultFilter();
      direccionFilter.filter.push({ criterio: 'clienteId', valor: `${this.vm.clienteId}` } as ItemSelectFilter);
  
      this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.direccion}`, direccionFilter)
        .subscribe(data => this.direccion$.next(data));
    }
  }

  save() {
    this.prepareVm();
    this.edit();
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

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.clienteId = formData.clienteId;
    this.vm.direccionId = formData.direccionId;
    this.vm.fechaCompromisoTomaMedida = !formData.fechaCompromisoTomaMedida 
      ? null
      : new Date(formData.fechaCompromisoTomaMedida.year, +formData.fechaCompromisoTomaMedida.month - 1, formData.fechaCompromisoTomaMedida.day);
    this.vm.empleadoAsignadoId = formData.empleadoAsignadoId;
    this.vm.vehiculoAsignadoId = formData.vehiculoAsignadoId;
  }

  private getEmty(): SolicitudTomaMedida{
    return new SolicitudTomaMedida(null);
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
  }
  
  private getFechaParaComponente(value: Date | null): any {
    if (value === null || value === undefined) {
      return null;
    }

    value = new Date(value);
    const dia = value.getDate();
    const mes = value.getMonth() + 1;
    const ano = value.getFullYear();

    return {
      year: ano,
      month: mes,
      day: dia
    };

  }
}
