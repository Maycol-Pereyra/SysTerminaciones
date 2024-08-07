import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { InformacionCuentaBanco } from '../../shared/informacion-cuenta-banco.model';
import { InformacionCuentaBancoService } from '../../shared/informacion-cuenta-banco.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-edit-informacion-cuenta-banco-modal',
  templateUrl: './edit-informacion-cuenta-banco-modal.component.html',
  styleUrls: ['./edit-informacion-cuenta-banco-modal.component.scss'],
})
export class EditInformacionCuentaBancoModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: InformacionCuentaBanco;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: InformacionCuentaBancoService,
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
        this.vm = item as InformacionCuentaBanco;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      banco: [this.vm.banco, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      numeroCuenta: [this.vm.numeroCuenta, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      tipoCuenta: [this.vm.tipoCuenta, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      identificacion: [this.vm.identificacion, Validators.compose([Validators.maxLength(100)])],
      beneficiario: [this.vm.beneficiario, Validators.compose([Validators.maxLength(100)])],
      nota: [this.vm.nota, Validators.compose([Validators.maxLength(250)])],
    });
  }

  save() {
    this.prepareVm();
    this.edit();
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

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.banco = formData.banco;
    this.vm.numeroCuenta = formData.numeroCuenta;
    this.vm.tipoCuenta = formData.tipoCuenta;
    this.vm.identificacion = formData.identificacion;
    this.vm.beneficiario = formData.beneficiario;
    this.vm.nota = formData.nota;
  }

  private getEmty(): InformacionCuentaBanco{
    return new InformacionCuentaBanco(null);
  }
}

