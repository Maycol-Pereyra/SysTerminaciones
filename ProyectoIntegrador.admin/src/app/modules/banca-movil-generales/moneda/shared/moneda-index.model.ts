export class MonedaIndex {
    public id: number;
    public nombre: string;
    public simbolo: string;
    public tasaCompra: number;
    public tasaVenta: number;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.nombre = vm.nombre || '';
        this.simbolo = vm.simbolo || '';
        this.tasaCompra = vm.tasaCompra || '';
        this.tasaVenta = vm.tasaVenta || '';
    }
}
