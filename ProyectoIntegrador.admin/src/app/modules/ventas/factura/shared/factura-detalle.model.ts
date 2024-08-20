export class FacturaDetalle {
    
    public facturaId: number;
    public productoId: number;
    public productoDescripcion: string;
    public unidadProductoId: number;
    public unidadProductoDescripcion: string;
    public medidaAncho: number;
    public medidaAnchoString: string;
    public medidaAlto: number;
    public medidaAltoString: string;
    public tipoMedidaId: number;
    public cantidad: number;
    public cantidadEntregada: number;
    public precioUnitario: number;
    public impuesto: number;
    public descuento: number;

    
    constructor(vm: any) {
        vm = vm || {};
        this.facturaId = vm.facturaId || 0;
        this.productoId = vm.productoId || 0;
        this.productoDescripcion = vm.productoDescripcion || 0;
        this.unidadProductoId = vm.unidadProductoId || 0;
        this.unidadProductoDescripcion = vm.unidadProductoDescripcion || 0;
        this.medidaAncho = vm.medidaAncho || 0;
        this.medidaAnchoString = vm.medidaAnchoString || '';
        this.medidaAlto = vm.medidaAlto || 0;
        this.medidaAltoString = vm.medidaAltoString || '';
        this.tipoMedidaId = vm.tipoMedidaId || 0;
        this.cantidad = vm.cantidad || 0;
        this.cantidadEntregada = vm.cantidadEntregada || 0;
        this.precioUnitario = vm.precioUnitario || 0;
        this.impuesto = vm.impuesto || 0;
        this.descuento = vm.descuento || 0;
    }
}
