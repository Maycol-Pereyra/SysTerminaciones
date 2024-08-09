export class Herramienta {
    public id: number;
    public descripcion: string;
    public estadoId: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.estadoId = vm.estadoId || null;
    }
}
