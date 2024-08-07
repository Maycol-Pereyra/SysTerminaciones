export class TipoServicioReclamacion {
    public id: number;
    public tipoSolicitudId: number | null;
    public debeEspecificarProducto: boolean;
    public tipoProductoSolicitudId: number | null;
    public descripcion: string;
    public descripcionLarga: string;
    public enviarCorreoOficialNegocioCliente: boolean;
    public enviarCorreoConfigurado: boolean;
    public correoConfigurado: string;
    public permiteAdjuntarArchivo: boolean;
    public esObligatorioAdjuntarArchivo: boolean;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.tipoSolicitudId = vm.tipoSolicitudId || null;
        this.debeEspecificarProducto = vm.debeEspecificarProducto || false;
        this.tipoProductoSolicitudId = vm.tipoProductoSolicitudId || null;
        this.descripcion = vm.descripcion || '';
        this.descripcionLarga = vm.descripcionLarga || '';
        this.enviarCorreoOficialNegocioCliente = vm.enviarCorreoOficialNegocio || false;
        this.enviarCorreoConfigurado = vm.enviarCorreoConfigurado || false;
        this.correoConfigurado = vm.correoConfigurado || '';
        this.permiteAdjuntarArchivo = vm.permiteAdjuntarArchivo || false;
        this.esObligatorioAdjuntarArchivo = vm.esObligatorioAdjuntarArchivo || false;
        this.estaActivo = vm.estaActivo || false;
    }
}
