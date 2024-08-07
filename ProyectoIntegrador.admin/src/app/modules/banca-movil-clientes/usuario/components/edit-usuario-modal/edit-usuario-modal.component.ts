import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { FormBase } from 'src/app/_core/clase-base/form-base';
import { maskCedula, maskRnc } from 'src/app/_core/const/formato-mascara';
import { ValidacionHelper } from 'src/app/_core/helpers/validacion.helper';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../shared/usuario.service';
import { ConfiguracionGeneral } from 'src/app/modules/banca-movil-generales/configuracion-general/shared/configuracion-general.model';
import {
  ConfiguracionGeneralService
} from 'src/app/modules/banca-movil-generales/configuracion-general/shared/configuracion-general.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { regexCorreo } from 'src/app/_core/const/regexp.const';

@Component({
  selector: 'app-edit-usuario-modal',
  templateUrl: './edit-usuario-modal.component.html',
  styleUrls: ['./edit-usuario-modal.component.scss'],
})
export class EditUsuarioModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  maskCedula = maskCedula;
  maskRnc = maskRnc;
  marcaEsRncCedula = false;

  vm: Usuario;

  get f() {
    return this.formGroup.controls;
  }

  get requiereCedulaPasaporteRnc(): boolean {
    if (this.formGroup) {
      const data = this.formGroup.value;

      return data.cedula.length === 0 && data.pasaporte.length === 0 && data.rnc.length === 0;
    }

    return false;
  }

  private config: ConfiguracionGeneral;
  private subscriptions: Subscription[] = [];
  private loginValue = '';

  constructor(
    private service: UsuarioService,
    private fb: FormBuilder,
    private configuracionGeneralService: ConfiguracionGeneralService,
    private cdr: ChangeDetectorRef,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.cargarConfiguracionGeneral();
  }

  isControlXValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return (control.valid && this.requiereCedulaPasaporteRnc === false) && (control.dirty || control.touched);
  }

  isControlXInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return (control.invalid || this.requiereCedulaPasaporteRnc) && (control.dirty || control.touched);
  }

  loadData() {
    const sb = this.service.getItemById(this.id)
    .pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.getEmty());
      })
    ).subscribe((item: Usuario) => {
      this.vm = item;
      this.loadForm();
    });
    this.subscriptions.push(sb);
  }

  loadForm() {
    const esManual = this.config.tipoAsignacionUsuario === 'manual';

    const rnc = this.getRncConFormato(this.vm.rnc);

    this.marcaEsRncCedula = rnc.length === 13;

    this.formGroup = this.fb.group({
      nombre: [this.vm.nombre, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      apellido: [this.vm.apellido, Validators.compose([Validators.maxLength(100)])],
      correo: [this.vm.correo, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(regexCorreo),
        Validators.maxLength(100)])
      ],
      cedula: [this.vm.cedula, Validators.compose([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}'),
        ValidacionHelper.cedulaModulo10Validator(true)
      ])],
      pasaporte: [this.vm.pasaporte, Validators.compose([Validators.maxLength(30)])],
      rnc: [rnc, Validators.compose([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}'),
        ValidacionHelper.rncModulo11Validator(true)
      ])],
      esRncCedula: [this.marcaEsRncCedula, Validators.compose([Validators.nullValidator])],
      nota: [this.vm.nota, Validators.compose([Validators.maxLength(250)])],
      login: [{ value: this.vm.login, disabled: !esManual}, Validators.compose([Validators.maxLength(100)])],
      estaActivo: [this.vm.estaActivo, Validators.compose([Validators.nullValidator])],
      permiteSolicitudTransferencia: [this.vm.permiteSolicitudTransferencia, Validators.compose([Validators.nullValidator])],
      permiteUsoCuentaAportacionComoOrigen: [
        this.vm.permiteUsoCuentaAportacionComoOrigen, Validators.compose([Validators.nullValidator])
      ],
      permiteTransferenciaInterna: [this.vm.permiteTransferenciaInterna, Validators.compose([Validators.nullValidator])],
      permiteTransferenciaOtroBanco: [this.vm.permiteTransferenciaOtroBanco, Validators.compose([Validators.nullValidator])],
      permitePagoPrestamo: [this.vm.permitePagoPrestamo, Validators.compose([Validators.nullValidator])],
      permitePagoServicio: [this.vm.permitePagoServicio, Validators.compose([Validators.nullValidator])],
      permiteTransaccionMultiple: [this.vm.permiteTransaccionMultiple, Validators.compose([Validators.nullValidator])],
      permiteCrearCertificaciones: [this.vm.permiteCrearCertificaciones, Validators.compose([Validators.nullValidator])],
      montoMaximoRetiroCuentas: [
        this.vm.montoMaximoRetiroCuentas, Validators.compose([Validators.required, Validators.min(0), Validators.max(99999999.99)])
      ],
    });

    this.loginValue = this.vm.login;

    if (this.config.tipoAsignacionUsuario === 'identificacion') {
      this.formGroup.get('cedula').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });

      this.formGroup.get('pasaporte').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });

      this.formGroup.get('rnc').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });
    }

    if (this.config.tipoAsignacionUsuario === 'correo') {
      this.formGroup.get('correo').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });
    }

    this.formGroup.get('esRncCedula').valueChanges.subscribe(val => {
      this.marcaEsRncCedula = !val ? false : val > 0;
      this.actualizaMarcaRnc();
    });

    this.actualizaMarcaRnc();
    // this.actualizarDatoLogin();
  }

  actualizarDatoLogin() {
    const formData = this.formGroup.value;
    if (this.config.tipoAsignacionUsuario === 'identificacion') {
      this.loginValue = formData.cedula;
      this.loginValue = this.appReplace(this.loginValue, ' ', '');
      this.loginValue = this.appReplace(this.loginValue, '-', '');
      this.loginValue = this.appReplace(this.loginValue, '_', '');

      if (this.loginValue === '') {
        this.loginValue = formData.pasaporte;
        this.loginValue = this.appReplace(this.loginValue, ' ', '');
        this.loginValue = this.appReplace(this.loginValue, '-', '');
        this.loginValue = this.appReplace(this.loginValue, '_', '');
      }

      if (this.loginValue === '') {
        this.loginValue = formData.rnc;
        this.loginValue = this.appReplace(this.loginValue, ' ', '');
        this.loginValue = this.appReplace(this.loginValue, '-', '');
        this.loginValue = this.appReplace(this.loginValue, '_', '');
      }

      this.formGroup.get('login').setValue(this.loginValue);
    }

    if (this.config.tipoAsignacionUsuario === 'correo') {
      this.loginValue = formData.correo;
      this.formGroup.get('login').setValue(this.loginValue);
    }
  }

  appReplace(texto: string, searchString: string, replacer: string): string {
    while (texto.indexOf(searchString, 0) >= 0) {
      texto = texto.replace(searchString, replacer);
    }

    return texto;
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    if (this.validar()) {
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
  }

  reiniciarClave(): void {
    if (this.accesosService.puede(
      'banca-movil.usuario.reiniciar-contrasena',
      'Usted no tiene acceso para reiniciar la contraseña del usuario')
      ) {
      const formData = this.formGroup.value;

      if (formData.correo === '') {
        this.mensajeValidacion ('Debe especificar el correo del usuario para poder proceder con el reinicio de contraseña');
        return;
      }

      this.confirmacion('¿Está seguro de reiniciar la contraseña?', 'Confirmación', () => {
        const sb = this.service
          .solicitarPassword(this.vm.login)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk('La nueva contraseña fue enviada al correo electrónico del usuario');
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  activar() {
    if (this.accesosService.puedeActivar('banca-movil.usuario.activar')) {
      const sb = this.service
        .activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('El cliente fue activado.');
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
      this.subscriptions.push(sb);
    }
  }

  inactivar() {
    if (this.accesosService.puedeActivar('banca-movil.usuario.inactivar')) {
      const sb = this.service
        .inactivar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('El cliente fue inactivado.');
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
      this.subscriptions.push(sb);
    }
  }

  quitarBloqueoTransaccionPorCodigoFallido() {
    if (this.accesosService.puede(
      'banca-movil.usuario.quitar-bloqueo',
      'Usted no tiene acceso a quitar bloqueo para transacción')
    ) {
      this.confirmacion('¿Está seguro de quitar el bloqueo para transacción?', 'Confirmación', ()=>{
        const sb = this.service
        .quitarBloqueoTransaccionPorCodigoFallido(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('El bloqueo del cliente para transacciones fue retirado.');
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
      this.subscriptions.push(sb);
      });
    }
  }

  quitarBloqueoEntradaFallida(){
    if (this.accesosService.puede(
      'banca-movil.usuario.quitar-bloqueo',
      'Usted no tiene acceso a quitar bloqueo de acceso')
    ) {
      this.confirmacion('¿Está seguro de quitar el bloqueo de acceso?', 'Confirmación', ()=>{
        const sb = this.service
        .quitarBloqueoEntradaFallida(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('El bloqueo de acceso del cliente fue retirado.');
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
      this.subscriptions.push(sb);
      });
    }
  }

  cambiarMetodoAutenticacion(){
    if (this.accesosService.puede(
      'banca-movil.usuario.deshabilitar-metodo-autenticacion',
      'Usted no tiene acceso a deshabilitar la aplicación de autenticación')
    ) {
      this.confirmacion('¿Está seguro de deshabilitar la aplicación de autenticación?', 'Confirmación', ()=>{
        const sb = this.service
        .cambiarMetodoAutenticacion(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('Se deshabilitó la aplicación de autenticacón con éxito.');
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

  private getEmty(): Usuario{
    return new Usuario(null);
  }

  private cargarConfiguracionGeneral() {
    const sb = this.configuracionGeneralService
      .getItemById(1)
      .subscribe(data => {
        this.config = new ConfiguracionGeneral(data);
        this.loadData();
      });
    this.subscriptions.push(sb);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.identificador = formData.identificador;
    this.vm.nombre = formData.nombre;
    this.vm.apellido = formData.apellido;
    this.vm.correo = formData.correo;
    this.vm.cedula = formData.cedula;
    this.vm.pasaporte = formData.pasaporte;
    this.vm.rnc = formData.rnc;
    this.vm.nota = formData.nota;
    this.vm.permiteSolicitudTransferencia = formData.permiteSolicitudTransferencia;
    this.vm.permiteUsoCuentaAportacionComoOrigen = formData.permiteUsoCuentaAportacionComoOrigen;
    this.vm.permiteTransferenciaInterna = formData.permiteTransferenciaInterna;
    this.vm.permiteTransferenciaOtroBanco = formData.permiteTransferenciaOtroBanco;
    this.vm.permitePagoPrestamo = formData.permitePagoPrestamo;
    this.vm.permitePagoServicio = formData.permitePagoServicio;
    this.vm.permiteTransaccionMultiple = formData.permiteTransaccionMultiple;
    this.vm.permiteCrearCertificaciones = formData.permiteCrearCertificaciones;
    this.vm.montoMaximoRetiroCuentas = formData.montoMaximoRetiroCuentas;
    // this.vm.login = formData.login;

    if (this.config.tipoAsignacionUsuario === 'manual') {
      this.vm.login = formData.login;
    } else {
      this.vm.login = this.loginValue;
    }
  }

  private validar() {
    if (this.config.tipoAsignacionUsuario === 'identificacion') {
      let data = this.vm.cedula;
      data = this.appReplace(data, ' ', '');
      data = this.appReplace(data, '-', '');
      data = this.appReplace(data, '_', '');

      if (data.length === 0) {
        data = this.vm.pasaporte;
        data = this.appReplace(data, ' ', '');
        data = this.appReplace(data, '-', '');
        data = this.appReplace(data, '_', '');
      }

      if (data.length === 0) {
        data = this.vm.rnc;
        data = this.appReplace(data, ' ', '');
        data = this.appReplace(data, '-', '');
        data = this.appReplace(data, '_', '');
      }

      if (data.length === 0) {
        this.mensajeValidacion('Debe especificar la cédula, pasaporte y/o RNC');
        return false;
      }
    }

    if (this.vm.cedula.length === 0 && this.vm.pasaporte.length === 0 && this.vm.rnc.length === 0) {
      this.mensajeValidacion('Debe especificar la cédula, pasaporte y/o RNC');
      return false;
    }

    if (this.config.tipoAsignacionUsuario === 'correo') {
      if (this.vm.correo.length === 0) {
        this.mensajeValidacion('Debe especificar el correo');
        return false;
      }
    }

    if (this.config.tipoAsignacionUsuario === 'manual') {
      if (this.vm.login.length === 0) {
        this.mensajeValidacion('Debe especificar el usuario');
        return false;
      }
    }

    return true;
  }

  private getRncConFormato(value: string): string {
    value = this.appReplace(value, ' ', '');
    value = this.appReplace(value, '-', '');
    value = this.appReplace(value, '_', '');

    if (value.length === 9) {
      return `${value.substring(0, 1)}-${value.substring(1, 3)}-${value.substring(3, 8)}-${value.substring(8, 9)}`;
    } else if (value.length === 11) {
      // 012-3456789-0
      return `${value.substring(0, 3)}-${value.substring(3, 10)}-${value.substring(10, 11)}`;
    }

    return '';
  }

  private actualizaMarcaRnc(): void {
    const campoRnc = this.formGroup.get('rnc') as FormControl;

    if (this.marcaEsRncCedula) {
      campoRnc.setValidators([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}'),
        ValidacionHelper.cedulaModulo10Validator(true)
      ]);
    } else {
      campoRnc.setValidators([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}'),
        ValidacionHelper.rncModulo11Validator(true)
      ]);
    }

    campoRnc.updateValueAndValidity();
    this.cdr.detectChanges();
  }
}
