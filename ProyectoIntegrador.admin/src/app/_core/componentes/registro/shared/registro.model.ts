export class Registro {
    public id: number;
    public tipoRegistroId: number;
    public descripcion: string;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.tipoRegistroId = vm.tipoRegistroId || 0;
        this.descripcion = vm.descripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
