import { ConfiguracionGeneralPersonaFirma } from './configuracion-general-persona-firma.model';

export class ConfiguracionGeneral {
    id: number;
    tipoAsignacionUsuario: string;
    claveRequiereMayuscula: boolean;
    claveRequiereMinuscula: boolean;
    claveRequiereNumero: boolean;
    claveRequiereSimbolo: boolean;
    claveCaracteresMinimo: number;
    utilizaDivisaManual: boolean;
    modeloTablaAmortizacion: string;
    permiteSolicitudTransferencia: boolean;
    permiteTransferenciaInterna: boolean;
    permiteTransferenciaOtroBanco: boolean;
    permitePagoPrestamo: boolean;
    permitePagoServicio: boolean;
    asignaAClienteAccesosATransacciones: boolean;
    permiteTransaccionMultiple: boolean;
    asignaAClienteAccesosATransaccionMultiple: boolean;
    requiereActualizacionDatosContacto: boolean;
    permiteVerCuentaClienteAutorizado: boolean;
    permiteOperacionCuentaClienteAutorizado: boolean;
    permiteVerCuentaClienteBeneficiario: boolean;
    permiteOperacionCuentaClienteBeneficiario: boolean;
    permiteVerCuentaClienteApoderado: boolean;
    permiteOperacionCuentaClienteApoderado: boolean;
    permiteVerPrestamoClienteGarante: boolean;
    permiteOperacionPrestamoClienteGarante: boolean;
    permiteVerPrestamoClienteFirmaContrato: boolean;
    permiteOperacionPrestamoClienteFirmaContrato: boolean;

    correoEnvioSolicitudTransferencia: string;
    correoEnvioSolicitudActualizacionDatosCliente: string;
    correoEnvioSolicitudTransaccionMultiple: string;
    formatoIdentificadorCuenta: string;
    formatoIdentificadorCertificado: string;
    formatoContratoPrestamo: string;
    paisId: number;
    usuarioCoreId: number | null;
    alertaSeleccionCuentaAportacionComoDestinoTransaccion: boolean;
    mensajeAlertaSeleccionCuentaAportacion: string;
    agregarNotaComoMotivoCancelacionTransferenciaOtroBanco: boolean;
    utilizaCertificacionEstudio: boolean;
    permiteCrearCertificacionEstudioPorDefecto: boolean;
    utilizaServiciosReclamaciones: boolean;
    montoMaximoRetiroCuentas: number;
    enviarNotificacionTransaccionTope: boolean;
    montoNotificacionTransaccionTope: number;
    enviarNotificacionTransaccionTopeCorreoOficialCliente: boolean;
    enviarNotificacionTransaccionTopeCorreoEspecificado: boolean;
    correoNotificacionTransaccionTope: string;
    enviarNotificacionRecuperacionClave: boolean;
    enviarNotificacionRecuperacionClaveCorreoOficialCliente: boolean;
    enviarNotificacionRecuperacionClaveCorreoEspecificado: boolean;
    correoNotificacionRecuperacionClave: string;
    enviarNotificacionRecuperacionClaveDesdeAdmin: boolean;
    empresaUtilizaCuentaAhorro: boolean;
    empresaUtilizaCuentaAportacion: boolean;
    empresaUtilizaPrestamo: boolean;
    empresaUtilizaCertificado: boolean;
    estaEnProcesoMantenimiento: boolean;
    mensajeProcesoMantenimiento: string;
    procesoMantenimientoPermiteLogin: boolean;


    listaPersonaFirma: ConfiguracionGeneralPersonaFirma[] = [];

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;

        this.tipoAsignacionUsuario = vm.tipoAsignacionUsuario || 'identificacion';
        this.claveRequiereMayuscula = vm.claveRequiereMayuscula || false;
        this.claveRequiereMinuscula = vm.claveRequiereMinuscula || false;
        this.claveRequiereNumero = vm.claveRequiereNumero || false;
        this.claveRequiereSimbolo = vm.claveRequiereSimbolo || false;
        this.claveCaracteresMinimo = vm.claveCaracteresMinimo || false;
        this.utilizaDivisaManual = vm.utilizaDivisaManual || false;
        this.modeloTablaAmortizacion = vm.modeloTablaAmortizacion || 'modelo01';
        this.permiteSolicitudTransferencia = !vm.permiteSolicitudTransferencia ? false : vm.permiteSolicitudTransferencia;
        this.permiteTransferenciaInterna = !vm.permiteTransferenciaInterna ? false : vm.permiteTransferenciaInterna;
        this.permiteTransferenciaOtroBanco = !vm.permiteTransferenciaOtroBanco ? false : vm.permiteTransferenciaOtroBanco;
        this.permitePagoPrestamo = !vm.permitePagoPrestamo ? false : vm.permitePagoPrestamo;
        this.permitePagoServicio = !vm.permitePagoServicio ? false : vm.permitePagoServicio;
        this.asignaAClienteAccesosATransacciones = !vm.asignaAClienteAccesosATransacciones ? false : vm.asignaAClienteAccesosATransacciones;

        this.permiteTransaccionMultiple = !vm.permiteTransaccionMultiple ? false : vm.permiteTransaccionMultiple;
        this.asignaAClienteAccesosATransaccionMultiple =
        !vm.asignaAClienteAccesosATransaccionMultiple ? false : vm.asignaAClienteAccesosATransaccionMultiple;

        this.requiereActualizacionDatosContacto = !vm.requiereActualizacionDatosContacto ? false : vm.requiereActualizacionDatosContacto;

        this.permiteVerCuentaClienteAutorizado = !vm.permiteVerCuentaClienteAutorizado ? false : vm.permiteVerCuentaClienteAutorizado;
        this.permiteOperacionCuentaClienteAutorizado =
            !vm.permiteOperacionCuentaClienteAutorizado ? false : vm.permiteOperacionCuentaClienteAutorizado;
        this.permiteVerCuentaClienteBeneficiario = !vm.permiteVerCuentaClienteBeneficiario ? false : vm.permiteVerCuentaClienteBeneficiario;
        this.permiteOperacionCuentaClienteBeneficiario =
            !vm.permiteOperacionCuentaClienteBeneficiario ? false : vm.permiteOperacionCuentaClienteBeneficiario;
        this.permiteVerCuentaClienteApoderado = !vm.permiteVerCuentaClienteApoderado ? false : vm.permiteVerCuentaClienteApoderado;
        this.permiteOperacionCuentaClienteApoderado =
            !vm.permiteOperacionCuentaClienteApoderado ? false : vm.permiteOperacionCuentaClienteApoderado;
        this.permiteVerPrestamoClienteGarante = !vm.permiteVerPrestamoClienteGarante ? false : vm.permiteVerPrestamoClienteGarante;
        this.permiteOperacionPrestamoClienteGarante =
            !vm.permiteOperacionPrestamoClienteGarante ? false : vm.permiteOperacionPrestamoClienteGarante;
        this.permiteVerPrestamoClienteFirmaContrato =
            !vm.permiteVerPrestamoClienteFirmaContrato ? false : vm.permiteVerPrestamoClienteFirmaContrato;
        this.permiteOperacionPrestamoClienteFirmaContrato =
            !vm.permiteOperacionPrestamoClienteFirmaContrato ? false : vm.permiteOperacionPrestamoClienteFirmaContrato;

        this.correoEnvioSolicitudTransferencia = vm.correoEnvioSolicitudTransferencia || '';
        this.correoEnvioSolicitudActualizacionDatosCliente = vm.correoEnvioSolicitudActualizacionDatosCliente || '';
        this.correoEnvioSolicitudTransaccionMultiple = vm.correoEnvioSolicitudTransaccionMultiple || '';
        this.formatoIdentificadorCuenta = vm.formatoIdentificadorCuenta || 'modelo01';
        this.formatoIdentificadorCertificado = vm.formatoIdentificadorCertificado || 'modelo01';
        this.formatoContratoPrestamo = vm.formatoContratoPrestamo || 'modelo01';
        this.paisId = vm.paisId || null;
        this.usuarioCoreId = vm.usuarioCoreId || null;

        this.alertaSeleccionCuentaAportacionComoDestinoTransaccion = vm.alertaSeleccionCuentaAportacionComoDestinoTransaccion || false;
        this.mensajeAlertaSeleccionCuentaAportacion = vm.mensajeAlertaSeleccionCuentaAportacion || '';
        this.agregarNotaComoMotivoCancelacionTransferenciaOtroBanco = vm.agregarNotaComoMotivoCancelacionTransferenciaOtroBanco || false;
        this.utilizaCertificacionEstudio = vm.utilizaCertificacionEstudio || false;
        this.permiteCrearCertificacionEstudioPorDefecto = vm.permiteCrearCertificacionEstudioPorDefecto || false;
        this.utilizaServiciosReclamaciones = vm.utilizaServiciosReclamaciones || false;
        this.montoMaximoRetiroCuentas = vm.montoMaximoRetiroCuentas || 0;
        this.enviarNotificacionTransaccionTope = vm.enviarNotificacionTransaccionTope || false;
        this.montoNotificacionTransaccionTope = vm.montoNotificacionTransaccionTope || 0;
        this.enviarNotificacionTransaccionTopeCorreoOficialCliente = vm.enviarNotificacionTransaccionTopeCorreoOficialCliente || false;
        this.enviarNotificacionTransaccionTopeCorreoEspecificado = vm.enviarNotificacionTransaccionTopeCorreoEspecificado || false;
        this.correoNotificacionTransaccionTope = vm.correoNotificacionTransaccionTope || '';
        this.enviarNotificacionRecuperacionClave = vm.enviarNotificacionRecuperacionClave || false;
        this.enviarNotificacionRecuperacionClaveCorreoOficialCliente = vm.enviarNotificacionRecuperacionClaveCorreoOficialCliente || false;
        this.enviarNotificacionRecuperacionClaveCorreoEspecificado = vm.enviarNotificacionRecuperacionClaveCorreoEspecificado || false;
        this.correoNotificacionRecuperacionClave = vm.correoNotificacionRecuperacionClave || '';
        this.enviarNotificacionRecuperacionClaveDesdeAdmin = vm.enviarNotificacionRecuperacionClaveDesdeAdmin || false;
        this.empresaUtilizaCuentaAhorro = vm.empresaUtilizaCuentaAhorro || false;
        this.empresaUtilizaCuentaAportacion = vm.empresaUtilizaCuentaAportacion || false;
        this.empresaUtilizaPrestamo = vm.empresaUtilizaPrestamo || false;
        this.empresaUtilizaCertificado = vm.empresaUtilizaCertificado || false;
        this.estaEnProcesoMantenimiento = vm.estaEnProcesoMantenimiento || false;
        this.mensajeProcesoMantenimiento = vm.mensajeProcesoMantenimiento || '';
        this.procesoMantenimientoPermiteLogin = vm.procesoMantenimientoPermiteLogin || false;

        this.listaPersonaFirma = vm.listaPersonaFirma || [];
    }
}
