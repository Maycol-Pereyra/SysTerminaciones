import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { maskRnc } from 'src/app/_core/const/formato-mascara';
import { ValidacionHelper } from 'src/app/_core/helpers/validacion.helper';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { EntidadBancariaTransferencia } from '../../shared/entidad-bancaria-transferencia.model';
import { EntidadBancariaTransferenciaService } from '../../shared/entidad-bancaria-transferencia.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from '../../../../../_core/item-select/item-select.model';

@Component({
  selector: 'app-edit-entidad-bancaria-transferencia-modal',
  templateUrl: './edit-entidad-bancaria-transferencia-modal.component.html',
  styleUrls: ['./edit-entidad-bancaria-transferencia-modal.component.scss'],
})
export class EditEntidadBancariaTransferenciaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  maskRnc = maskRnc;
  vm: EntidadBancariaTransferencia;
  listaModeloArchiboBatch: ItemSelect[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private service: EntidadBancariaTransferenciaService,
    private fb: FormBuilder,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
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
        this.vm = item as EntidadBancariaTransferencia;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre: [
        this.vm.nombre,
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])
      ],
      cuentaBanco: [this.vm.cuentaBanco, Validators.compose([Validators.required, Validators.maxLength(50)])],
      rnc: [this.vm.rnc, Validators.compose([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}'),
        ValidacionHelper.rncModulo11Validator(true)
      ])],
      entidadIdentificador: [this.vm.entidadIdentificador, Validators.compose([Validators.maxLength(3)])],
      entidadNumero: [this.vm.entidadNumero, Validators.compose([
        Validators.pattern('[0123456789]*'),
        Validators.maxLength(10)
      ])],
      codigoIban: [this.vm.codigoIban, Validators.compose([Validators.maxLength(50)])],
      codigoSwift: [this.vm.codigoSwift, Validators.compose([Validators.maxLength(50)])],
      nota: [this.vm.nota, Validators.compose([Validators.maxLength(250)])],
      estaActivo: [this.vm.estaActivo, Validators.compose([Validators.nullValidator])],
      usaDestinoAportacion: [this.vm.usaDestinoAportacion, Validators.compose([Validators.nullValidator])],
      usaDestinoAhorro: [this.vm.usaDestinoAhorro, Validators.compose([Validators.nullValidator])],
      usaDestinoCorriente: [this.vm.usaDestinoCorriente, Validators.compose([Validators.nullValidator])],
      usaDestinoPrestamo: [this.vm.usaDestinoPrestamo, Validators.compose([Validators.nullValidator])],
      usaDestinoTarjetaCredito: [this.vm.usaDestinoTarjetaCredito, Validators.compose([Validators.nullValidator])],
      tipoModeloArchiboBatchId: [this.vm.tipoModeloArchiboBatchId, Validators.compose([Validators.nullValidator])],
      numeroBatch: [this.vm.numeroBatch, Validators.compose([Validators.maxLength(5)])],
      tipoCuentaBanco: [this.vm.tipoCuentaBanco, Validators.compose([Validators.maxLength(2)])],
    });
  }

  save() {
    if (this.validar()) {
      this.prepareVm();
      this.edit();
    }
  }

  edit() {
    const sbUpdate = this.service
      .update(this.vm)
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
    this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de activar el registro?', 'Confirmación', () => {
      const sb = this.service.activar(this.vm.id)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.mensajeOk('Se ha activado la entidad bancaria');
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
      this.subscriptions.push(sb);
    });
  }

  inactivar(): void {
    this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de inactivar el registro?', 'Confirmación', () => {
      const sb = this.service
        .inactivar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('Se ha inactivado la entidad bancaria');
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
      this.subscriptions.push(sb);
    });
  }

  validar(): boolean {
    const formData = this.formGroup.value;
    if (
      formData.usaDestinoAportacion === false &&
      formData.usaDestinoAhorro === false &&
      formData.usaDestinoCorriente === false &&
      formData.usaDestinoPrestamo === false &&
      formData.usaDestinoTarjetaCredito === false)
    {
      this.mensajeValidacion('Debe de seleccionar al menos 1 destino de transacción');
      return false;
    }

    if (formData.tipoCuentaBanco === '') {
      this.mensajeValidacion('Debe de especificar el tipo de cuenta de banco de la entidad');
      return false;
    }

    return true;
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.nombre = formData.nombre;
    this.vm.cuentaBanco = formData.cuentaBanco;
    this.vm.rnc = formData.rnc;
    this.vm.entidadIdentificador = formData.entidadIdentificador;
    this.vm.entidadNumero = formData.entidadNumero;
    this.vm.codigoIban = formData.codigoIban;
    this.vm.codigoSwift = formData.codigoSwift;
    this.vm.nota = formData.nota;
    this.vm.estaActivo = formData.estaActivo;
    this.vm.usaDestinoAportacion = formData.usaDestinoAportacion;
    this.vm.usaDestinoAhorro = formData.usaDestinoAhorro;
    this.vm.usaDestinoCorriente = formData.usaDestinoCorriente;
    this.vm.usaDestinoPrestamo = formData.usaDestinoPrestamo;
    this.vm.usaDestinoTarjetaCredito = formData.usaDestinoTarjetaCredito;
    this.vm.tipoModeloArchiboBatchId = formData.tipoModeloArchiboBatchId;
    this.vm.numeroBatch = formData.numeroBatch;
    this.vm.tipoCuentaBanco = formData.tipoCuentaBanco;
  }

  private getEmty(): EntidadBancariaTransferencia{
    return new EntidadBancariaTransferencia(null);
  }

  
}
