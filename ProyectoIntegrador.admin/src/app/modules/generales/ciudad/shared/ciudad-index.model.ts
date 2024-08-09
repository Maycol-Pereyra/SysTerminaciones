export class CiudadIndex {
    public id: number;
    public descripcion: string;
    public provinciaId: number;
    public provinciaDescripcion: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.provinciaId = vm.provinciaId || 0;
        this.provinciaDescripcion = vm.provinciaDescripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
