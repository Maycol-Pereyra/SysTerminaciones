export class EntidadBancariaTransferenciaIndex {
    public id: number;
    public nombre: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.nombre = vm.nombre || '';
        this.estaActivo = vm.estaActivo === undefined ? false : vm.estaActivo;
    }
}
