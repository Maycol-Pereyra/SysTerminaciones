export class CotizacionIndex {
    public id: number; 
    public clienteId: number; 
    public clienteNombre: string; 
    public numeroCotizacion: string; 
    public monto: number; 
    public llevaEnvio: boolean; 
    public llevaInstalacion: boolean; 
    public fechaCreacion: Date;
    public estadoId: number; 
    public estadoDescripcion: string;
    
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || 0;
        this.clienteNombre = vm.clienteNombre || '';
        this.numeroCotizacion = vm.numeroCotizacion || '';
        this.monto = vm.monto || 0;
        this.llevaEnvio = vm.llevaEnvio || false;
        this.llevaInstalacion = vm.llevaInstalacion || false;
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion;
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || '';
    }
}
