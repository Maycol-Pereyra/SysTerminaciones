export class ItemSelect {
    public id: number;
    public identificador: string;
    public descripcion: string;
    public estaActivo: boolean;
    public objeto: any;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.identificador = vm.identificador || '';
        this.descripcion = vm.descripcion || '';
        this.estaActivo = vm.estaActivo === undefined ? true : vm.estaActivo;
        this.objeto = vm.objeto;
    }
}
