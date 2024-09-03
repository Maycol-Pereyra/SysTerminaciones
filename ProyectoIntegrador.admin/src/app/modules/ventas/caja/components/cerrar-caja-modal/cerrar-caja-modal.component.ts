import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { CajaService } from '../../shared/caja.service';
import { AperturaCaja } from '../../shared/apertura-caja.model';

@Component({
  selector: 'app-cerrar-caja-modal',
  templateUrl: './cerrar-caja-modal.component.html',
})
export class CerrarCajaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: AperturaCaja;
  caja$;
  turno$;

  public listaSolicitud: ItemSelect[] = [];
  public listaTipoProducto: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: CajaService,
    private fb: FormBuilder,
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

    this.caja$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.caja}`);

    const filtroTurno = ItemSelectService.defaultFilter();
    filtroTurno.filter.push({ criterio: 'tipoDefectoId', valor: '7'});
    this.turno$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.turno}`, filtroTurno);

    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      cajaId: [null, Validators.compose([Validators.required])],
      turnoId: [null, Validators.compose([Validators.required])],
    });
  }

  save() {
    this.prepareVm();
    this.cerrar();
  }

  cerrar() {
    if (!this.validar()) { return; }

    this.confirmacion(`¿Está seguro de cerrar la caja?`, 'Confirmación', () => {
      const sb = this.service.cerrarCaja(this.vm)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.mensajeOk(`Se ha cerrado la caja`);
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
      this.subscriptions.push(sb);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm = new AperturaCaja({
      cajaId: +formData.cajaId,
      turnoId: +formData.turnoId
    });
  }

  private validar(): boolean {
    if (+this.vm.cajaId === 0) {
      this.mensajeValidacion('Debe especificar la caja');
      return false;
    }

    if (+this.vm.turnoId === 0) {
      this.mensajeValidacion('Debe especificar el turno');
      return false;
    }

    return true;
  }

}
