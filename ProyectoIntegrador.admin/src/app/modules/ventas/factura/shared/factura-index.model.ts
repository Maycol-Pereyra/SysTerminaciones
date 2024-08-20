export class FacturaIndex {
    public id: number;
    public clienteId: number;
    public clienteNombre: string;
    public numeroFactura: string;
    public monto: number;
    public tipoComprobanteId: number;
    public comprobante: string;
    public llevaEnvio: boolean;
    public llevaInstalacion: boolean;
    public usuarioCreacionId: number;
    public fechaCreacion: Date;
    public estadoId: number;
    public estadoDescripcion: string;

    
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || 0;
        this.clienteNombre = vm.clienteNombre || '';
        this.numeroFactura = vm.numeroFactura || '';
        this.monto = vm.monto || 0;
        this.tipoComprobanteId = vm.tipoComprobanteId || 0;
        this.comprobante = vm.comprobante || '';
        this.llevaEnvio = vm.llevaEnvio || false;
        this.llevaInstalacion = vm.llevaInstalacion || false;
        this.usuarioCreacionId = vm.usuarioCreacionId || 0;
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion;
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || '';
    }
}
