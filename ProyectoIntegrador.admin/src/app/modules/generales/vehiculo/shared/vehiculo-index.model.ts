export class vehiculoIndex {
    public id: number;
    public marca: string;
    public modelo: string;
    public placa: string;
    public colorId: number;
    public colorDescripcion: string;
    public estadoId: number;
    public estadoDescripcion: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.marca = vm.marca || '';
        this.modelo = vm.modelo || '';
        this.placa = vm.placa || '';
        this.colorId = vm.colorId || null;
        this.colorDescripcion = vm.colorDescripcion || '';
        this.estadoId = vm.estadoId || null;
        this.estadoDescripcion = vm.estadoDescripcion || '';
    }
}
