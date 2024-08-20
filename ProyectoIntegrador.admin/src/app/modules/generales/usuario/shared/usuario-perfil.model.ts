export class UsuarioPerfil {
    public usuarioId: number;
    public perfilId: number;
    public seleccionado: boolean;
    
    constructor(vm: any) {
        vm = vm || {};
        this.usuarioId = vm.usuarioId || 0,
        this.perfilId = vm.perfilId || 0,
        this.seleccionado = vm.seleccionado || false;
    }
}
