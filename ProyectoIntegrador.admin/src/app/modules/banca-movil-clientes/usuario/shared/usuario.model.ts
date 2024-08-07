export class Usuario {
    public id: number;
    public clienteId: number;
    public identificador: string;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public cedula: string;
    public pasaporte: string;
    public rnc: string;
    public nota: string;
    public estaActivo: boolean;
    public login: string;
    public permiteSolicitudTransferencia: boolean;
    public permiteUsoCuentaAportacionComoOrigen: boolean;
    public permiteTransferenciaInterna: boolean;
    public permiteTransferenciaOtroBanco: boolean;
    public permitePagoPrestamo: boolean;
    public permitePagoServicio: boolean;
    public permiteTransaccionMultiple: boolean;
    public bloqueoTransaccionPorCodigoFallido: boolean;
    public bloqueoEntradaFallida: boolean;
    public permiteCrearCertificaciones: boolean;
    public montoMaximoRetiroCuentas: number;
    public twoFactorMetodoId: number;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || 0;
        this.identificador = vm.identificador || '';
        this.nombre = vm.nombre || '';
        this.apellido = vm.apellido || '';
        this.correo = vm.correo || '';
        this.cedula = vm.cedula || '';
        this.pasaporte = vm.pasaporte || '';
        this.rnc = vm.rnc || '';
        this.nota = vm.nota || '';
        this.estaActivo = !vm.estaActivo ? true : vm.estaActivo;
        this.bloqueoTransaccionPorCodigoFallido = vm.bloqueoTransaccionPorCodigoFallido === undefined
            ? false : vm.bloqueoTransaccionPorCodigoFallido;
        this.login = vm.login || '';
        this.permiteSolicitudTransferencia = !vm.permiteSolicitudTransferencia ? false : vm.permiteSolicitudTransferencia;
        this.permiteUsoCuentaAportacionComoOrigen =
            !vm.permiteUsoCuentaAportacionComoOrigen ? false : vm.permiteUsoCuentaAportacionComoOrigen;
        this.permiteTransferenciaInterna = !vm.permiteTransferenciaInterna ? false : vm.permiteTransferenciaInterna;
        this.permiteTransferenciaOtroBanco = !vm.permiteTransferenciaOtroBanco ? false : vm.permiteTransferenciaOtroBanco;
        this.permitePagoPrestamo = !vm.permitePagoPrestamo ? false : vm.permitePagoPrestamo;
        this.permitePagoServicio = !vm.permitePagoServicio ? false : vm.permitePagoServicio;
        this.permiteTransaccionMultiple = !vm.permiteTransaccionMultiple ? false : vm.permiteTransaccionMultiple;
        this.bloqueoEntradaFallida = vm.bloqueoEntradaFallida || false;
        this.permiteCrearCertificaciones = vm.permiteCrearCertificaciones || false;
        this.montoMaximoRetiroCuentas = vm.montoMaximoRetiroCuentas || 0;
        this.twoFactorMetodoId = vm.twoFactorMetodoId || 0;
    }
}
