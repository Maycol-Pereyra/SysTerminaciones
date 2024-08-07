export class TipoPagoIndex {
    id: number;
    descripcion: string;
    estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.estaActivo = !vm.estaActivo ? true : vm.estaActivo;
    }
}
