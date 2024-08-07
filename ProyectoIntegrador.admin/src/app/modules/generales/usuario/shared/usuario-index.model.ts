export class UsuarioIndex {
    public id: number;
    public identificador: string;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public login: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.identificador = vm.identificador || '';
        this.nombre = vm.nombre || '';
        this.apellido = vm.apellido || '';
        this.login = vm.login || '';
        this.correo = vm.correo || '';
        this.estaActivo = vm.estaActivo === undefined ? false : vm.estaActivo;
    }
}
