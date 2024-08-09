export class SectorIndex {
    public id: number;
    public descripcion: string;
    public ciudadId: number;
    public ciudadDescripcion: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.ciudadId = vm.ciudadId || 0;
        this.ciudadDescripcion = vm.ciudadDescripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
