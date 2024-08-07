export class TipoCertificacionIndex {
    public id: number;
    public tipoCertificacionInternaId: number;
    public descripcion: string;
    public nota: string;
    public estaActivo: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.tipoCertificacionInternaId = vm.tipoCertificacionInternaId || 0;
        this.descripcion = vm.descripcion || '';
        this.nota = vm.nota || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
