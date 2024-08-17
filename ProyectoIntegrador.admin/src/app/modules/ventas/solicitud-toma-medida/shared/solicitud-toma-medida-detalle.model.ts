export class SolicitudTomaMedidaDetalle {
    public solicitudTomaMedidaId: number; 
    public tomaMedidaId: number; 
    public productoId: number;
    public productoDescripcion: string;
    public unidadProductoId: number;
    public unidadProductoDescripcion: string;
    public cantidad: number; 
    public medidaAncho: number; 
    public medidaAnchoString: string; 
    public medidaAlto: number; 
    public medidaAltoString: string; 
    public tipoMedidaId: number; 
    public esMedidaAproximada: boolean; 
    public nota: string; 

    constructor(vm: any) {
        vm = vm || {};
        this.solicitudTomaMedidaId = vm.solicitudTomaMedidaId || 0;
        this.tomaMedidaId = vm.tomaMedidaId || 0;
        this.productoId = vm.productoId || 0;
        this.productoDescripcion = vm.productoDescripcion || '';
        this.unidadProductoId = vm.unidadProductoId || 0;
        this.unidadProductoDescripcion = vm.unidadProductoDescripcion || '';
        this.cantidad = vm.cantidad || 0;
        this.medidaAncho = vm.medidaAncho || 0;
        this.medidaAnchoString = vm.medidaAnchoString || '';
        this.medidaAlto = vm.medidaAlto || 0;
        this.medidaAltoString = vm.medidaAltoString || '';
        this.tipoMedidaId = vm.tipoMedidaId || 0;
        this.esMedidaAproximada = vm.esMedidaAproximada || false;
        this.nota = vm.nota || '';
    }
}
