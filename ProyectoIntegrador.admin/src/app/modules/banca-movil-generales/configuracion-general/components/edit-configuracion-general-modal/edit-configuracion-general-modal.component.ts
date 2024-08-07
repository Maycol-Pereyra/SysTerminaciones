import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { NgbTimeStringAdapter } from '../../../../../_metronic/core/utils/time-string-adapter';
import { PaisService } from '../../../services/pais.service';
import { ConfiguracionGeneral } from '../../shared/configuracion-general.model';
import { ConfiguracionGeneralService } from '../../shared/configuracion-general.service';
import { regexCorreo } from 'src/app/_core/const/regexp.const';
import { FeatureFlagService } from 'src/app/_core/services/feature-flag.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';

@Component({
  selector: 'app-edit-configuracion-general-modal',
  templateUrl: './edit-configuracion-general-modal.component.html',
  styleUrls: ['./edit-configuracion-general-modal.component.scss'],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }]
})
export class EditConfiguracionGeneralModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  listaPais$;
  usuarioCore$: Observable<ItemSelect[]>;

  vm: ConfiguracionGeneral;
  mostrarMensajeAlerta: boolean;

  listaTipoAsignacionUsuario = [
    {
      id: 'identificacion',
      descripcion: 'Identificación del cliente (cédula, rnc, pasaporte)'
    },
    {
      id: 'correo',
      descripcion: 'Correo del cliente'
    },
    {
      id: 'manual',
      descripcion: 'Manual'
    }
  ];

  listaModeloTablaAmortizacion = [
    {
      id: 'modelo01',
      descripcion: 'No. 1: (Cuota, Mora, Total)'
    },
    {
      id: 'modelo02',
      descripcion: 'No. 2: (Capital, Intereses, Seguro, Cargo, Mora, Total)'
    },
    {
      id: 'modelo03',
      descripcion: 'No. 3: (Solo Total)'
    }
  ];

  listaFormatoIdentificadorCuenta = [
    {
      id: 'modelo01',
      descripcion: 'No. 1, ###-###-#######-#, EJ. 001-001-3000006-8'
    },
    {
      id: 'modelo02',
      descripcion: 'No. 2, ###-######-#, EJ. 001-000001-6'
    },
    {
      id: 'modelo03',
      descripcion: 'No. 3, 001-###-#######-#, EJ. 001-001-3000006-8'
    },
  ];

  listaFormatoIdentificadorCertificado = [
    {
      id: 'modelo01',
      descripcion: 'No. 1, ###-######, EJ. 001-000010'
    },
  ];

  listaFormatoContratoPrestamo = [
    {
      id: 'modelo01',
      descripcion: 'No. 1, ###-######, EJ. 001-000010'
    },
    {
      id: 'modelo02',
      descripcion: 'No. 2, @###-######, EJ. C001-000010'
    },
  ];

  get f() {
    return this.formGroup.controls;
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private service: ConfiguracionGeneralService,
    private fb: FormBuilder,
    private paisService: PaisService,
    private cd: ChangeDetectorRef,
    public modal: NgbActiveModal,
    public featureFlagService: FeatureFlagService,
    private itemSelectService: ItemSelectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.listaPais$ = this.paisService.getLista();
    this.usuarioCore$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.solicitudPrestamosUsuarioCore}`);
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
      claveRequiereMayuscula: [this.vm.claveRequiereMayuscula, Validators.compose([Validators.nullValidator])],
      claveRequiereMinuscula: [this.vm.claveRequiereMinuscula, Validators.compose([Validators.nullValidator])],
      claveRequiereNumero: [this.vm.claveRequiereNumero, Validators.compose([Validators.nullValidator])],
      claveRequiereSimbolo: [this.vm.claveRequiereSimbolo, Validators.compose([Validators.nullValidator])],
      claveCaracteresMinimo: [
        this.vm.claveCaracteresMinimo,
        Validators.compose([Validators.required, Validators.min(1), Validators.max(32)])
      ],
      tipoAsignacionUsuario: [this.vm.tipoAsignacionUsuario, Validators.compose([Validators.required])],
      modeloTablaAmortizacion: [this.vm.modeloTablaAmortizacion, Validators.compose([Validators.required])],
      utilizaDivisaManual: [this.vm.utilizaDivisaManual, Validators.compose([Validators.nullValidator])],
      permiteSolicitudTransferencia: [this.vm.permiteSolicitudTransferencia, Validators.compose([Validators.nullValidator])],
      permiteTransferenciaInterna: [this.vm.permiteTransferenciaInterna, Validators.compose([Validators.nullValidator])],
      permiteTransferenciaOtroBanco: [this.vm.permiteTransferenciaOtroBanco, Validators.compose([Validators.nullValidator])],
      permitePagoPrestamo: [this.vm.permitePagoPrestamo, Validators.compose([Validators.nullValidator])],
      permitePagoServicio: [this.vm.permitePagoServicio, Validators.compose([Validators.nullValidator])],
      asignaAClienteAccesosATransacciones: [this.vm.asignaAClienteAccesosATransacciones, Validators.compose([Validators.nullValidator])],
      permiteTransaccionMultiple: [this.vm.permiteTransaccionMultiple, Validators.compose([Validators.nullValidator])],
      asignaAClienteAccesosATransaccionMultiple: [
        this.vm.asignaAClienteAccesosATransaccionMultiple,
        Validators.compose([Validators.nullValidator
        ])],
      requiereActualizacionDatosContacto: [this.vm.requiereActualizacionDatosContacto, Validators.compose([Validators.nullValidator])],
      permiteVerCuentaClienteAutorizado: [
        this.vm.permiteVerCuentaClienteAutorizado, Validators.compose([Validators.nullValidator])
      ],
      permiteOperacionCuentaClienteAutorizado: [
        this.vm.permiteOperacionCuentaClienteAutorizado, Validators.compose([Validators.nullValidator])
      ],
      permiteVerCuentaClienteBeneficiario: [
        this.vm.permiteVerCuentaClienteBeneficiario, Validators.compose([Validators.nullValidator])
      ],
      permiteOperacionCuentaClienteBeneficiario: [
        this.vm.permiteOperacionCuentaClienteBeneficiario, Validators.compose([Validators.nullValidator])
      ],
      permiteVerCuentaClienteApoderado: [
        this.vm.permiteVerCuentaClienteApoderado, Validators.compose([Validators.nullValidator])
      ],
      permiteOperacionCuentaClienteApoderado: [
        this.vm.permiteOperacionCuentaClienteApoderado, Validators.compose([Validators.nullValidator])
      ],
      permiteVerPrestamoClienteGarante: [
        this.vm.permiteVerPrestamoClienteGarante, Validators.compose([Validators.nullValidator])
      ],
      permiteOperacionPrestamoClienteGarante: [
        this.vm.permiteOperacionPrestamoClienteGarante, Validators.compose([Validators.nullValidator])
      ],
      permiteVerPrestamoClienteFirmaContrato: [
        this.vm.permiteVerPrestamoClienteFirmaContrato, Validators.compose([Validators.nullValidator])
      ],
      permiteOperacionPrestamoClienteFirmaContrato: [
        this.vm.permiteOperacionPrestamoClienteFirmaContrato, Validators.compose([Validators.nullValidator])
      ],
      correoEnvioSolicitudTransferencia: [
        this.vm.correoEnvioSolicitudTransferencia,
        Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])
      ],
      correoEnvioSolicitudActualizacionDatosCliente: [
        this.vm.correoEnvioSolicitudActualizacionDatosCliente,
        Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])
      ],
      correoEnvioSolicitudTransaccionMultiple: [
        this.vm.correoEnvioSolicitudTransaccionMultiple,
        Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])
      ],
      formatoIdentificadorCuenta: [this.vm.formatoIdentificadorCuenta, Validators.compose([Validators.required])],
      formatoIdentificadorCertificado: [this.vm.formatoIdentificadorCertificado, Validators.compose([Validators.required])],
      formatoContratoPrestamo: [this.vm.formatoContratoPrestamo, Validators.compose([Validators.required])],
      paisId: [this.vm.paisId, Validators.compose([Validators.nullValidator])],
      usuarioCoreId: [this.vm.usuarioCoreId],
      alertaSeleccionCuentaAportacionComoDestinoTransaccion: [
        this.vm.alertaSeleccionCuentaAportacionComoDestinoTransaccion, Validators.compose([Validators.nullValidator])],
      mensajeAlertaSeleccionCuentaAportacion: [
        this.vm.mensajeAlertaSeleccionCuentaAportacion, Validators.compose([Validators.maxLength(250)])],
      agregarNotaComoMotivoCancelacionTransferenciaOtroBanco: [
        this.vm.agregarNotaComoMotivoCancelacionTransferenciaOtroBanco, Validators.compose([Validators.nullValidator])],
      utilizaCertificacionEstudio: [this.vm.utilizaCertificacionEstudio, Validators.compose([Validators.nullValidator])],
      permiteCrearCertificacionEstudioPorDefecto: [
        this.vm.permiteCrearCertificacionEstudioPorDefecto, Validators.compose([Validators.nullValidator])],
      utilizaServiciosReclamaciones: [this.vm.utilizaServiciosReclamaciones, Validators.compose([Validators.nullValidator])],
      montoMaximoRetiroCuentas: [
        this.vm.montoMaximoRetiroCuentas, Validators.compose([Validators.required, Validators.min(0), Validators.max(99999999.99)])
      ],
      enviarNotificacionTransaccionTope: [this.vm.enviarNotificacionTransaccionTope, Validators.compose([Validators.nullValidator])],
      montoNotificacionTransaccionTope: [
        this.vm.montoNotificacionTransaccionTope, Validators.compose([Validators.required, Validators.min(0), Validators.max(99999999.99)])
      ],
      enviarNotificacionTransaccionTopeCorreoOficialCliente:
        [this.vm.enviarNotificacionTransaccionTopeCorreoOficialCliente, Validators.compose([Validators.nullValidator])],
      enviarNotificacionTransaccionTopeCorreoEspecificado:
        [this.vm.enviarNotificacionTransaccionTopeCorreoEspecificado, Validators.compose([Validators.nullValidator])],

      correoNotificacionTransaccionTope: [
        this.vm.correoNotificacionTransaccionTope,
        Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])
      ],
      enviarNotificacionRecuperacionClave: [this.vm.enviarNotificacionRecuperacionClave, Validators.compose([Validators.nullValidator])],
      enviarNotificacionRecuperacionClaveCorreoOficialCliente:
        [this.vm.enviarNotificacionRecuperacionClaveCorreoOficialCliente, Validators.compose([Validators.nullValidator])],
      enviarNotificacionRecuperacionClaveCorreoEspecificado:
        [this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado, Validators.compose([Validators.nullValidator])],
      correoNotificacionRecuperacionClave: [
        this.vm.correoNotificacionRecuperacionClave,
        Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])
      ],
      enviarNotificacionRecuperacionClaveDesdeAdmin:
        [this.vm.enviarNotificacionRecuperacionClaveDesdeAdmin, Validators.compose([Validators.nullValidator])],
      empresaUtilizaCuentaAhorro: [this.vm.empresaUtilizaCuentaAhorro, Validators.compose([Validators.nullValidator])],
      empresaUtilizaCuentaAportacion: [this.vm.empresaUtilizaCuentaAportacion, Validators.compose([Validators.nullValidator])],
      empresaUtilizaPrestamo: [this.vm.empresaUtilizaPrestamo, Validators.compose([Validators.nullValidator])],
      empresaUtilizaCertificado: [this.vm.empresaUtilizaCertificado, Validators.compose([Validators.nullValidator])],
      estaEnProcesoMantenimiento: [
        this.vm.estaEnProcesoMantenimiento,
        Validators.compose([Validators.nullValidator, Validators.maxLength(250)])],
      mensajeProcesoMantenimiento: [this.vm.mensajeProcesoMantenimiento, Validators.compose([Validators.nullValidator])],
      procesoMantenimientoPermiteLogin: [this.vm.procesoMantenimientoPermiteLogin, Validators.compose([Validators.nullValidator])],
    });

    this.actualizaMensajeProcesoMantenimiento(this.vm.estaEnProcesoMantenimiento);

    this.mostrarMensajeAlerta = this.formGroup.value.alertaSeleccionCuentaAportacionComoDestinoTransaccion;

    this.formGroup.get('estaEnProcesoMantenimiento').valueChanges.subscribe(val => {
      this.actualizaMensajeProcesoMantenimiento(val);
      this.cd.detectChanges();
    });

    this.cd.detectChanges();
  }

  mostrarMensaje() {
    this.mostrarMensajeAlerta = !this.mostrarMensajeAlerta;

    if (this.mostrarMensajeAlerta === false) {
      this.formGroup.controls.mensajeAlertaSeleccionCuentaAportacion.setValue('');
    }
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

    if (this.mostrarMensajeAlerta === true && this.formGroup.controls.mensajeAlertaSeleccionCuentaAportacion.value.length === 0) {
      this.mensajeValidacion('Debe especificar el mensaje de alerta.');
      return false;
    }

    const formData = this.formGroup.value;

    if (formData.enviarNotificacionTransaccionTope) {
      if (+formData.montoNotificacionTransaccionTope <= 0) {
        this.mensajeValidacion(`Debe especificar el monto tope para notificación de movimientos`);
        return false;
      }

      if (formData.enviarNotificacionTransaccionTopeCorreoEspecificado === false &&
        formData.enviarNotificacionTransaccionTopeCorreoOficialCliente === false) {
        this.mensajeValidacion(`Debe especificar un correo donde se enviará la notificación de movimientso con tope mayor a un monto`);
        return false;
      }

      if (formData.enviarNotificacionTransaccionTopeCorreoEspecificado) {
        if (formData.correoNotificacionTransaccionTope === '') {
          this.mensajeValidacion(`Debe especificar el correo donde se enviará la notificación de movimientos con tope mayor a un monto`);
          return false;
        }
      }
    }

    if (formData.enviarNotificacionRecuperacionClave) {
      if (formData.enviarNotificacionRecuperacionClaveCorreoEspecificado === false &&
        formData.enviarNotificacionRecuperacionClaveCorreoOficialCliente === false) {
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

    for (const item of this.vm.listaPersonaFirma) {
      if (item.nombre !== '' && item.puesto === '') {
        this.mensajeValidacion(
          `Debe especificar el puesto del representante de la certificación de estudio para la sucursal ${item.sucursalNombre}`);
        return false;
      }

      if (item.puesto !== '' && item.nombre === '') {
        this.mensajeValidacion(
          `Debe especificar el nombre del representante de la certificación de estudio para la sucursal ${item.sucursalNombre}`);
        return false;
      }
    }

    if (!formData.empresaUtilizaCuentaAhorro
      && !formData.empresaUtilizaCuentaAportacion
      && !formData.empresaUtilizaPrestamo
      && !formData.empresaUtilizaCertificado) {
      this.mensajeValidacion(
        `Debe especificar al menos un tipo de producto para la solicitud de acceso`);
      return false;
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

  private actualizaMensajeProcesoMantenimiento(val: boolean): void {
    const campo = this.formGroup.get('mensajeProcesoMantenimiento') as FormControl;
    const validators = val
      ? [Validators.required, Validators.minLength(1), Validators.maxLength(250)]
      : [Validators.nullValidator, Validators.maxLength(250)];
    campo.setValidators(validators);
    campo.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private prepareVm() {
    const formData = this.formGroup.value;

    this.vm.tipoAsignacionUsuario = formData.tipoAsignacionUsuario;
    this.vm.claveRequiereMayuscula = formData.claveRequiereMayuscula;
    this.vm.claveRequiereMinuscula = formData.claveRequiereMinuscula;
    this.vm.claveRequiereNumero = formData.claveRequiereNumero;
    this.vm.claveRequiereSimbolo = formData.claveRequiereSimbolo;
    this.vm.claveCaracteresMinimo = formData.claveCaracteresMinimo;
    this.vm.utilizaDivisaManual = formData.utilizaDivisaManual;
    this.vm.modeloTablaAmortizacion = formData.modeloTablaAmortizacion;
    this.vm.permiteSolicitudTransferencia = formData.permiteSolicitudTransferencia;
    this.vm.permiteTransferenciaInterna = formData.permiteTransferenciaInterna;
    this.vm.permiteTransferenciaOtroBanco = formData.permiteTransferenciaOtroBanco;
    this.vm.permitePagoPrestamo = formData.permitePagoPrestamo;
    this.vm.permitePagoServicio = formData.permitePagoServicio;
    this.vm.asignaAClienteAccesosATransacciones = formData.asignaAClienteAccesosATransacciones;
    this.vm.permiteTransaccionMultiple = formData.permiteTransaccionMultiple;
    this.vm.asignaAClienteAccesosATransaccionMultiple = formData.asignaAClienteAccesosATransaccionMultiple;
    this.vm.requiereActualizacionDatosContacto = formData.requiereActualizacionDatosContacto;
    this.vm.permiteVerCuentaClienteAutorizado = formData.permiteVerCuentaClienteAutorizado;
    this.vm.permiteOperacionCuentaClienteAutorizado = formData.permiteOperacionCuentaClienteAutorizado;
    this.vm.permiteVerCuentaClienteBeneficiario = formData.permiteVerCuentaClienteBeneficiario;
    this.vm.permiteOperacionCuentaClienteBeneficiario = formData.permiteOperacionCuentaClienteBeneficiario;
    this.vm.permiteVerCuentaClienteApoderado = formData.permiteVerCuentaClienteApoderado;
    this.vm.permiteOperacionCuentaClienteApoderado = formData.permiteOperacionCuentaClienteApoderado;
    this.vm.permiteVerPrestamoClienteGarante = formData.permiteVerPrestamoClienteGarante;
    this.vm.permiteOperacionPrestamoClienteGarante = formData.permiteOperacionPrestamoClienteGarante;
    this.vm.permiteVerPrestamoClienteFirmaContrato = formData.permiteVerPrestamoClienteFirmaContrato;
    this.vm.permiteOperacionPrestamoClienteFirmaContrato = formData.permiteOperacionPrestamoClienteFirmaContrato;
    this.vm.correoEnvioSolicitudTransferencia = formData.correoEnvioSolicitudTransferencia;
    this.vm.correoEnvioSolicitudActualizacionDatosCliente = formData.correoEnvioSolicitudActualizacionDatosCliente;
    this.vm.correoEnvioSolicitudTransaccionMultiple = formData.correoEnvioSolicitudTransaccionMultiple;
    this.vm.formatoIdentificadorCuenta = formData.formatoIdentificadorCuenta;
    this.vm.formatoIdentificadorCertificado = formData.formatoIdentificadorCertificado;
    this.vm.formatoContratoPrestamo = formData.formatoContratoPrestamo;
    this.vm.paisId = formData.paisId;
    this.vm.usuarioCoreId = formData.usuarioCoreId;
    this.vm.alertaSeleccionCuentaAportacionComoDestinoTransaccion = formData.alertaSeleccionCuentaAportacionComoDestinoTransaccion;
    this.vm.mensajeAlertaSeleccionCuentaAportacion = formData.mensajeAlertaSeleccionCuentaAportacion;
    this.vm.agregarNotaComoMotivoCancelacionTransferenciaOtroBanco = formData.agregarNotaComoMotivoCancelacionTransferenciaOtroBanco;
    this.vm.utilizaCertificacionEstudio = formData.utilizaCertificacionEstudio;
    this.vm.permiteCrearCertificacionEstudioPorDefecto = formData.permiteCrearCertificacionEstudioPorDefecto;
    this.vm.utilizaServiciosReclamaciones = formData.utilizaServiciosReclamaciones;
    this.vm.montoMaximoRetiroCuentas = formData.montoMaximoRetiroCuentas;

    this.vm.enviarNotificacionTransaccionTope = formData.enviarNotificacionTransaccionTope;
    this.vm.montoNotificacionTransaccionTope = formData.montoNotificacionTransaccionTope;
    this.vm.enviarNotificacionTransaccionTopeCorreoOficialCliente = formData.enviarNotificacionTransaccionTopeCorreoOficialCliente;
    this.vm.enviarNotificacionTransaccionTopeCorreoEspecificado = formData.enviarNotificacionTransaccionTopeCorreoEspecificado;
    this.vm.correoNotificacionTransaccionTope = formData.correoNotificacionTransaccionTope;
    this.vm.enviarNotificacionRecuperacionClave = formData.enviarNotificacionRecuperacionClave;
    this.vm.enviarNotificacionRecuperacionClaveCorreoOficialCliente = formData.enviarNotificacionRecuperacionClaveCorreoOficialCliente;
    this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado = formData.enviarNotificacionRecuperacionClaveCorreoEspecificado;
    this.vm.correoNotificacionRecuperacionClave = formData.correoNotificacionRecuperacionClave;
    this.vm.enviarNotificacionRecuperacionClaveDesdeAdmin = formData.enviarNotificacionRecuperacionClaveDesdeAdmin;
    this.vm.empresaUtilizaCuentaAhorro = formData.empresaUtilizaCuentaAhorro;
    this.vm.empresaUtilizaCuentaAportacion = formData.empresaUtilizaCuentaAportacion;
    this.vm.empresaUtilizaPrestamo = formData.empresaUtilizaPrestamo;
    this.vm.empresaUtilizaCertificado = formData.empresaUtilizaCertificado;
    this.vm.estaEnProcesoMantenimiento = formData.estaEnProcesoMantenimiento;
    this.vm.mensajeProcesoMantenimiento = formData.mensajeProcesoMantenimiento;
    this.vm.procesoMantenimientoPermiteLogin = formData.procesoMantenimientoPermiteLogin;

    if (this.vm.utilizaCertificacionEstudio === false) {
      this.vm.permiteCrearCertificacionEstudioPorDefecto = false;
      this.vm.listaPersonaFirma = [];
    }

    if (this.vm.enviarNotificacionTransaccionTope === false) {
      this.vm.montoNotificacionTransaccionTope = 0;
      this.vm.enviarNotificacionTransaccionTopeCorreoEspecificado = false;
      this.vm.enviarNotificacionTransaccionTopeCorreoOficialCliente = false;
      this.vm.correoNotificacionTransaccionTope = '';
    }

    if (this.vm.enviarNotificacionTransaccionTopeCorreoEspecificado === false) {
      this.vm.correoNotificacionTransaccionTope = '';
    }

    if (this.vm.enviarNotificacionRecuperacionClave === false) {
      this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado = false;
      this.vm.enviarNotificacionRecuperacionClaveCorreoOficialCliente = false;
      this.vm.correoNotificacionRecuperacionClave = '';
      this.vm.enviarNotificacionRecuperacionClaveDesdeAdmin = false;
    }

    if (this.vm.enviarNotificacionRecuperacionClaveCorreoEspecificado === false) {
      this.vm.correoNotificacionRecuperacionClave = '';
    }

    if (this.vm.estaEnProcesoMantenimiento === false) {
      this.vm.mensajeProcesoMantenimiento = '';
      this.vm.procesoMantenimientoPermiteLogin = false;
    }
  }

  private getEmpty(): ConfiguracionGeneral {
    return new ConfiguracionGeneral(null);
  }
}
