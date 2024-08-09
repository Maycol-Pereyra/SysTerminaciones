export class herramientaIndex {
    public id: number;
    public descripcion: string;
    public estadoId: number;
    public estadoDescripcion: string;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || '';
    }
}
