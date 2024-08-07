/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../../../_core/services/authentication.service';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';
import { Router } from '@angular/router';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { ConfirmacionPasswordValidator } from './confirmacion-password.validator';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  readonly panelUsuario = 1;
  readonly panelCodigo = 2;
  readonly panelContrasena = 3;

  panel = +this.panelUsuario;
  contador = 0;
  mensajeError = '';
  procesando = false;

  vm: any = {
    login: '',
    codigoSeguridadId: '',
    codigoSeguridad: '',
    password: '',
    confirmacionPassword: ''
  };

  formGroup: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  initForm() {
    this.formGroup = this.fb.group({
      login: ['',Validators.compose([Validators.required, Validators.maxLength(100)])],
      codigo: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      password: ['',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
      confirmacionPassword: ['',Validators.compose([Validators.required])]
    }, {
      validator: Validators.compose([
        ConfirmacionPasswordValidator.passwordSonIguales,
      ])
    });
  }

  olvideContrasena() {
    if (this.procesando) {
      return;
    }

    this.vm.login = this.formGroup.controls.login.value;

    if (!this.vm.login || StringHelper.obtenerValorString(this.vm.login) === '') {
      Mensajes.toastWarning('Debe de especificar el usuario');
      return;
    }

    if (this.vm.codigoSeguridadId.length > 0) {
      this.panel = +this.panelCodigo;
      return;
    }

    this.procesando = true;

    const sb = this.authService
      .olvideContrasena(this.vm.login)
      .pipe(
        finalize(() => {
          this.procesando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(data => {
        if (!data || data.msg) {
          Mensajes.toastWarning(data.msg);
          return;
        }

        this.vm.codigoSeguridadId = data.id;
        this.panel = +this.panelCodigo;
      });

    this.unsubscribe.push(sb);
  }

  reenviarCodigoSeguridad() {
    if (this.procesando) {
      return;
    }

    this.vm.login = this.formGroup.controls.login.value;

    this.procesando = true;

    const sb = this.authService
      .reenviaCodigoSeguridadId(this.vm.login, this.vm.codigoSeguridadId)
      .pipe(
        finalize(() => {
          this.procesando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(data => {
        if (!data || data.msg) {
          Mensajes.toastWarning(data.msg);
          return;
        }

        this.vm.codigoSeguridadId = data.id;
        Mensajes.toastWarning('El código de seguridad fue reenviado a su correo');
      });
    this.unsubscribe.push(sb);
  }

  validaCodigo() {
    if (this.procesando) {
      return;
    }

    this.vm.login = this.formGroup.controls.login.value;
    this.vm.codigoSeguridad = this.formGroup.controls.codigo.value;

    if (!this.vm.codigoSeguridad || StringHelper.obtenerValorString(this.vm.codigoSeguridad) === '') {
      Mensajes.toastWarning('Debe de especificar el código que se envió a su correo.');
      return;
    }

    if (this.vm.codigoSeguridad.length !== 6) {
      Mensajes.toastWarning('El código debe de tener 6 caracteres.');
      return;
    }

    this.procesando = true;

    const sb = this.authService
      .validaCodigoSeguridad(this.vm.login, this.vm.codigoSeguridadId, this.vm.codigoSeguridad)
      .pipe(
        finalize(() => {
          this.procesando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(data => {
        if (!data || data.msg) {
          this.contador++;

          if (this.contador > 3) {
            Mensajes.toastWarning('Ha intentado el código de seguridad más de 3 veces, intente más tarde.');
            this.vm.login = '';
            this.vm.codigoSeguridadId = '';
            this.vm.codigoSeguridad = '';
            this.vm.password = '';
            this.vm.confirmacionPassword = '';
            this.panel = +this.panelUsuario;
          } else {
            Mensajes.toastWarning(data.msg);
          }

          return;
        }

        this.panel = +this.panelContrasena;
      });
    this.unsubscribe.push(sb);
  }

  actualizarContrasena() {
    if (this.procesando) {
      return;
    }

    this.vm.login = this.formGroup.controls.login.value;
    this.vm.codigoSeguridad = this.formGroup.controls.codigo.value;
    this.vm.password = this.formGroup.controls.password.value;
    this.vm.confirmacionPassword = this.formGroup.controls.confirmacionPassword.value;

    if (!this.vm.codigoSeguridad || StringHelper.obtenerValorString(this.vm.codigoSeguridad) === '') {
      Mensajes.toastWarning('Debe de especificar el código que se envió a su correo.');
      return;
    }

    if (this.vm.codigoSeguridad.length !== 6) {
      Mensajes.toastWarning('El código debe de tener 6 caracteres.');
      return;
    }

    if (!this.vm.password || StringHelper.obtenerValorString(this.vm.password.trim()) === '') {
      Mensajes.toastWarning('Debe especificar la contraseña.');
      return;
    }

    if (!this.vm.confirmacionPassword || StringHelper.obtenerValorString(this.vm.confirmacionPassword.trim()) === '') {
      Mensajes.toastWarning('Debe especificar la contraseña.');
      return;
    }

    if (this.vm.password !== this.vm.confirmacionPassword) {
      Mensajes.toastWarning('La contraseña y su confirmación deben de ser iguales.');
      return;
    }

    this.procesando = true;

    const sb = this.authService
      .olvideContrasenaActualiza(this.vm.login, this.vm.codigoSeguridadId, this.vm.codigoSeguridad, this.vm.password)
      .pipe(
        finalize(() => {
          this.procesando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(data => {
        if (!data || data.msg) {
          Mensajes.toastWarning(data.msg);
          return;
        }

        Mensajes.mensajeOk('La contraseña fue actualizada.');
        this.router.navigate(['/']);
      });
    this.unsubscribe.push(sb);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  mensajeValidacion(msg: string): void {
    Swal.fire('Validación', msg, 'warning');
  }

  volverAtras02() {
    this.panel = +this.panelUsuario;
    this.vm.codigoSeguridad = '';

    this.cdr.detectChanges();
  }

  volverAtras03() {
    this.panel = +this.panelCodigo;
    this.vm.codigoSeguridad = '';
    this.vm.password = '';
    this.vm.confirmacionPassword = '';

    this.limpiarCampoCodigo();
    this.cdr.detectChanges();
  }

  limpiarCampoCodigo(){
    this.formGroup.controls.codigo.setValue('');
    this.formGroup.controls.codigo.markAsUntouched();
    this.formGroup.controls.codigo.markAsPristine();
  }

  enCambioUsuario() {
    this.vm.codigoSeguridadId = '';
    this.vm.codigoSeguridad = '';
    this.vm.password = '';
    this.vm.confirmacionPassword = '';

    this.cdr.detectChanges();
  }
}
