export class Provincia {
    public id: number;
    public descripcion: string;
    public paisId: number;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.paisId = vm.paisId || null;
        this.estaActivo = vm.estaActivo || false;
    }
}
