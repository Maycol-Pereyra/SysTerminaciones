export class CotizacionDetalle {
    
    public cotizacionId: number;
    public productoId: number;
    public productoDescripcion: string;
    public unidadProductoId: number;
    public unidadProductoDescripcion: string;
    public medidaAncho: number;
    public medidaAnchoString: number;
    public medidaAlto: number;
    public medidaAltoString: number;
    public tipoMedidaId: number;
    public cantidad: number;
    public precioUnitario: number;
    public impuesto: number;
    public descuento: number;
    
    constructor(vm: any) {
        vm = vm || {};
        this.cotizacionId = vm.cotizacionId || 0;
        this.productoId = vm.productoId || 0;
        this.productoDescripcion = vm.productoDescripcion || '';
        this.unidadProductoId = vm.unidadProductoId || 0;
        this.unidadProductoDescripcion = vm.unidadProductoDescripcion || '';
        this.medidaAncho = vm.medidaAncho || 0;
        this.medidaAnchoString = vm.medidaAnchoString || '';
        this.medidaAlto = vm.medidaAlto || 0;
        this.medidaAltoString = vm.medidaAltoString || '';
        this.tipoMedidaId = vm.tipoMedidaId || 0;
        this.cantidad = vm.cantidad || 0;
        this.precioUnitario = vm.precioUnitario || 0;
        this.impuesto = vm.impuesto || 0;
        this.descuento = vm.descuento || 0;
    }
}
