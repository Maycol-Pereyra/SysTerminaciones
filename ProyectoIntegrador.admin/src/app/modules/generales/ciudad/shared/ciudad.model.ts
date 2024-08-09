export class Ciudad {
    public id: number;
    public descripcion: string;
    public provinciaId: number;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.provinciaId = vm.provinciaId || null;
        this.estaActivo = vm.estaActivo || false;
    }
}
