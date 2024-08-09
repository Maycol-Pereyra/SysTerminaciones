export class Vehiculo {
    public id: number;
    public marca: string;
    public modelo: string;
    public anoFabricacion: number;
    public placa: string;
    public colorId: number;
    public colorDescripcion: string;
    public kilometraje: number;
    public capacidadCarga: number;
    public unidadCargaId: number;
    public estadoId: number;
    

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.marca = vm.marca || '';
        this.modelo = vm.modelo || '';
        this.anoFabricacion = vm.anoFabricacion || 0;
        this.placa = vm.placa || '';
        this.colorId = vm.colorId || null;
        this.kilometraje = vm.kilometraje || 0;
        this.capacidadCarga = vm.capacidadCarga || 0;
        this.unidadCargaId = vm.unidadCargaId || null;
        this.estadoId = vm.estadoId || null;
    }
}
