import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { TipoPago } from '../../shared/tipo-pago.model';
import { TipoPagoService } from '../../shared/tipo-pago.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-edit-tipo-pago-modal',
  templateUrl: './edit-tipo-pago-modal.component.html',
  styleUrls: ['./edit-tipo-pago-modal.component.scss'],
})
export class EditTipoPagoModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: TipoPago;

  conceptoNotaDebitoAhorro$;
  conceptoNotaCreditoAhorro$;

  private listaConceptoNotaDebitoAhorro: ItemSelect[] = [];
  private listaConceptoNotaCreditoAhorro: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: TipoPagoService,
    private fb: FormBuilder,
    private itemSelectService: ItemSelectService,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    const filter1 = ItemSelectService.defaultFilter();
    filter1.filter = [{criterio: 'tipo', valor: 'ND'}];

    const filter2 = ItemSelectService.defaultFilter();
    filter2.filter = [{criterio: 'tipo', valor: 'NC'}];

    this.conceptoNotaDebitoAhorro$ = this.itemSelectService
    .getAny(`${AppConfig.settings.api}${EndPointSelect.bancaMovilConceptoCuentaAhorrosLista}`, filter1)
    .pipe(
      tap((data) => this.listaConceptoNotaDebitoAhorro = data)
    );

    this.conceptoNotaCreditoAhorro$ = this.itemSelectService
    .getAny(`${AppConfig.settings.api}${EndPointSelect.bancaMovilConceptoCuentaAhorrosLista}`, filter2)
    .pipe(
      tap((data) => this.listaConceptoNotaCreditoAhorro = data)
    );

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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
        this.vm = item as TipoPago;
        this.loadForm();
      });

      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      conceptoNotaDebitoAhorroId: [this.vm.conceptoNotaDebitoAhorroId, Validators.compose([Validators.required])],
      conceptoNotaCreditoAhorroId: [this.vm.conceptoNotaCreditoAhorroId, Validators.compose([Validators.required])],
      estaActivo: [this.vm.estaActivo, Validators.compose([Validators.nullValidator])],
    });
  }

  save() {
    this.prepareVm();

    const sbUpdate = this.service
      .update(this.vm)
      .subscribe(res => {
        if (res && res.id) {
          this.mensajeOk('El registro fue realizado correctamente.');
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sbUpdate);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.descripcion = formData.descripcion;
    this.vm.conceptoNotaDebitoAhorroId = formData.conceptoNotaDebitoAhorroId;
    this.vm.conceptoNotaDebitoAhorroDescripcion = this.getConceptoNotaDebitoAhorro(this.vm.conceptoNotaDebitoAhorroId);
    this.vm.conceptoNotaCreditoAhorroId = formData.conceptoNotaCreditoAhorroId;
    this.vm.conceptoNotaCreditoAhorroDescripcion = this.getConceptoNotaCreditoAhorro(this.vm.conceptoNotaCreditoAhorroId);
    this.vm.estaActivo = formData.estaActivo;
  }

  private getEmty(): TipoPago{
    return new TipoPago(null);
  }

  private getConceptoNotaDebitoAhorro(id: number): string {
    const item = this.listaConceptoNotaDebitoAhorro.find(o => o.id === +id);
    return item ? item.descripcion : '';
  }

  private getConceptoNotaCreditoAhorro(id: number): string {
    const item = this.listaConceptoNotaCreditoAhorro.find(o => o.id === +id);
    return item ? item.descripcion : '';
  }
}
