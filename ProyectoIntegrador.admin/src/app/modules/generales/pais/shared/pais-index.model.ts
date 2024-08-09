export class PaisIndex {
    public id: number;
    public descripcion: string;
    public paisDescripcion: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.paisDescripcion = vm.paisDescripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
