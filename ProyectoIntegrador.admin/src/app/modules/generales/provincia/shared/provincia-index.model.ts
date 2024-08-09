export class ProvinciaIndex {
    public id: number;
    public descripcion: string;
    public paisId: number;
    public paisDescripcion: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.paisId = vm.paisId || 0;
        this.paisDescripcion = vm.paisDescripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
