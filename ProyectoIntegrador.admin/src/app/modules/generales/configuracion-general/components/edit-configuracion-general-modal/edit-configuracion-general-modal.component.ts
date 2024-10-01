import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { NgbTimeStringAdapter } from '../../../../../_metronic/core/utils/time-string-adapter';
import { ConfiguracionGeneral } from '../../shared/configuracion-general.model';
import { ConfiguracionGeneralService } from '../../shared/configuracion-general.service';
import { regexCorreo } from 'src/app/_core/const/regex.const';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';

@Component({
  selector: 'app-edit-configuracion-general-modal',
  templateUrl: './edit-configuracion-general-modal.component.html',
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }]
})
export class EditConfiguracionGeneralModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  listaPais$;
  usuarioCore$: Observable<ItemSelect[]>;

  vm: ConfiguracionGeneral;

  get f() {
    return this.formGroup.controls;
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private service: ConfiguracionGeneralService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public modal: NgbActiveModal
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
      this.vm = this.getEmpty();
      this.loadForm();
    } else {
      const sb = this.service
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(this.getEmpty());
          })
        ).subscribe(item => {
          this.vm = item as ConfiguracionGeneral;
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      enviarNotificacionRecuperacionClave: [this.vm.enviarNotificacionRecuperacionClave, Validators.compose([Validators.nullValidator])],
      enviarNotificacionRecuperacionClaveCorreoEspecificado:
        [this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado, Validators.compose([Validators.nullValidator])],
      correoNotificacionRecuperacionClave: [
        this.vm.correoNotificacionRecuperacionClave,
        Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])
      ],
    });

    this.cd.detectChanges();
  }

  save() {
    this.prepareVm();
    if (!this.validar()) {
      return;
    }

    if (this.vm.id > 0) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
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

  validar(): boolean {
    const formData = this.formGroup.value;

    if (formData.enviarNotificacionRecuperacionClave) {
      if (formData.enviarNotificacionRecuperacionClaveCorreoEspecificado === false) {
        this.mensajeValidacion(`Debe especificar un correo donde se enviará la notificación de recuperación de clave`);
        return false;
      }

      if (formData.enviarNotificacionRecuperacionClaveCorreoEspecificado) {
        if (formData.correoNotificacionRecuperacionClave === '') {
          this.mensajeValidacion(`Debe especificar el correo donde se enviará la notificación de recuperación de clave`);
          return false;
        }
      }
    }

    return true;
  }

  create() {
    const sbCreate = this.service
      .create(this.vm)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sbCreate);
  }

  private prepareVm() {
    const formData = this.formGroup.value;

    this.vm.enviarNotificacionRecuperacionClave = formData.enviarNotificacionRecuperacionClave;
    this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado = formData.enviarNotificacionRecuperacionClaveCorreoEspecificado;
    this.vm.correoNotificacionRecuperacionClave = formData.correoNotificacionRecuperacionClave;

    if (this.vm.enviarNotificacionRecuperacionClave === false) {
      this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado = false;
      this.vm.correoNotificacionRecuperacionClave = '';
    }

    if (this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado === false) {
      this.vm.correoNotificacionRecuperacionClave = '';
    }
  }

  private getEmpty(): ConfiguracionGeneral {
    return new ConfiguracionGeneral(null);
  }
}
