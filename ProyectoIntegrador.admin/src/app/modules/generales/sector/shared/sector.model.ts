export class Sector {
    public id: number;
    public descripcion: string;
    public ciudadId: number;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.ciudadId = vm.ciudadId || null;
        this.estaActivo = vm.estaActivo || false;
    }
}
