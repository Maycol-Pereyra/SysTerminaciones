export class TipoServicioReclamacionIndex {
    public id: number;
    public tipoSolicitudId: number;
    public descripcion: number;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.tipoSolicitudId = vm.tipoSolicitudId || 0;
        this.descripcion = vm.descripcion || '';
    }
}
