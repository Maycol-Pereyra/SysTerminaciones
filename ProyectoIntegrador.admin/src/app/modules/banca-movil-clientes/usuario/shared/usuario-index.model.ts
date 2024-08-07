export class UsuarioIndex {
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
    public requiereCambioPassword: boolean;
    public twoFactorMetodoId: number;
    public bloqueoTransaccionPorCodigoFallido: boolean;

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
        this.estaActivo = !vm.estaActivo ? null : vm.estaActivo;
        this.requiereCambioPassword = !vm.requiereCambioPassword ? null : vm.requiereCambioPassword;
        this.twoFactorMetodoId = vm.twoFactorMetodoId || 1;
        this.bloqueoTransaccionPorCodigoFallido = vm.bloqueoTransaccionPorCodigoFallido === undefined
            ? false : vm.bloqueoTransaccionPorCodigoFallido;
        this.login = vm.login || '';
    }
}
