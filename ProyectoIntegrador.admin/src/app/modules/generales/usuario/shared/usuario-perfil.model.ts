export class UsuarioPerfil {
    public usuarioId: number;
    public perfilId: number;
    
    constructor(vm: any) {
        vm = vm || {};
        this.usuarioId = vm.usuarioId || 0,
        this.perfilId = vm.perfilId || 0
    }
}
