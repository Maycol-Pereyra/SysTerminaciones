export class ProductoDetalleProduccion {
    public productoId: number;
    public productoProduccionId: number;
    public productoProduccionDescripcion: string;
    public unidadProduccionId: number;
    public unidadProduccionDescripcion: string;
    public cantidad: number;

    constructor(vm: any) {
        vm = vm || {};
        this.productoId = vm.productoId || 0;
        this.productoProduccionId = vm.productoProduccionId || null;
        this.productoProduccionDescripcion = vm.productoProduccionDescripcion || '';
        this.unidadProduccionId = vm.unidadProduccionId || null;
        this.unidadProduccionDescripcion = vm.unidadProduccionDescripcion || '';
        this.cantidad = vm.precioCompra || 0;
    }
}
