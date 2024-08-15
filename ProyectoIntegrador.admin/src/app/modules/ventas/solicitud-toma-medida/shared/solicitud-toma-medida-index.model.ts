export class SolicitudTomaMedidaIndex {
    public id: number;
    public clienteId: number;
    public clienteNombre: string;
    public empleadoAsignadoId: number | null;
    public empleadoAsignadoNombre: string;
    public vehiculoAsignadoId: number | null;
    public vehiculoAsignadoDescripcion: string;
    public fechaCompromisoTomaMedida: Date | null;
    public fechaTomaMedida: Date | null;
    public fechaCreacion: Date;
    public estadoId: number;
    public estadoDescripcion: string;
    public direccionDescripcion: string;
    
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || 0;
        this.clienteNombre = vm.clienteNombre || '';
        this.empleadoAsignadoId = vm.empleadoAsignadoId || null;
        this.empleadoAsignadoNombre = vm.empleadoAsignadoNombre || '';
        this.vehiculoAsignadoId = vm.vehiculoAsignadoId || null;
        this.vehiculoAsignadoDescripcion = vm.vehiculoAsignadoDescripcion || '';
        this.fechaCompromisoTomaMedida = !vm.fechaCompromisoTomaMedida ? null : vm.fechaCompromisoTomaMedida;
        this.fechaTomaMedida = !vm.fechaTomaMedida ? null : vm.fechaTomaMedida;
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion;
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || '';
        this.direccionDescripcion = vm.direccionDescripcion || '';
    }
}
