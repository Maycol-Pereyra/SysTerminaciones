export class Unidad {
    public id: number;
    public descripcion: string;
    public abreviatura: string;
    public cantidad: number;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.abreviatura = vm.abreviatura || '';
        this.cantidad = vm.cantidad || 0;
        this.estaActivo = vm.estaActivo || false;
    }
}
