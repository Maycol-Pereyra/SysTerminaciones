export class UnidadIndex {
    public id: number;
    public descripcion: string;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
