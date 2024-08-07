export class Usuario {
    public id: number;
    public identificador: string;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public nota: string;
    public estaActivo: boolean;
    public perfilId: number;
    public usuarioCoreId: number;
    public login: string;
    public password: string;
    public requiereCambioPassword: boolean;
    public token: string;
    public bloqueoEntradaFallida: boolean;
    public sucursalAgenciaId: number;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.identificador = vm.identificador || '';
        this.nombre = vm.nombre || '';
        this.apellido = vm.apellido || '';
        this.correo = vm.correo || '';
        this.nota = vm.nota || '';
        this.perfilId = !vm.perfilId ? null : vm.perfilId;
        this.sucursalAgenciaId = !vm.sucursalAgenciaId ? null : vm.sucursalAgenciaId;
        this.usuarioCoreId = !vm.usuarioCoreId ? null : vm.usuarioCoreId;
        this.login = vm.login || '';
        this.password = vm.password || '';
        this.token = vm.token || '';
        this.estaActivo = vm.estaActivo === undefined ? false : vm.estaActivo;
        this.requiereCambioPassword = vm.requiereCambioPassword === undefined ? false : vm.requiereCambioPassword;
        this.bloqueoEntradaFallida = vm.bloqueoEntradaFallida || false;
    }
}
