export class PerfilAcceso {
    id: number;
    perfilId: number;
    accesoId: number;
    seleccionado: boolean;
    key: string;
    modulo: string;
    opcion: string;
    permiso: string;
    descripcion: string;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.id = vm.id || 0;
        this.perfilId = vm.perfilId || 0;
        this.accesoId = vm.accesoId || 0;
        this.seleccionado = !vm.seleccionado ? false: vm.seleccionado;
        this.key = vm.key || '';
        this.modulo = vm.modulo || '';
        this.opcion = vm.opcion || '';
        this.permiso = vm.permiso || '';
        this.descripcion = vm.descripcion || '';
    }
}
