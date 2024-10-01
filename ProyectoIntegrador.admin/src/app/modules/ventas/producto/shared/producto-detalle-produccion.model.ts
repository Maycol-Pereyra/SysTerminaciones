export class ProductoDetalleProduccion {
    public productoId: number;
    public productoProduccionId: number;
    public productoProduccionDescripcion: string;
    public unidadProduccionId: number;
    public unidadProduccionDescripcion: string;
    public cantidad: number;
    public descuento: number;
    public division: number;
    public tipoId: number;
    public tipoDescripcion: string;

    constructor(vm: any) {
        vm = vm || {};
        this.productoId = vm.productoId || 0;
        this.productoProduccionId = vm.productoProduccionId || null;
        this.productoProduccionDescripcion = vm.productoProduccionDescripcion || '';
        this.unidadProduccionId = vm.unidadProduccionId || null;
        this.unidadProduccionDescripcion = vm.unidadProduccionDescripcion || '';
        this.cantidad = vm.cantidad || 0;
        this.descuento = vm.descuento || 0;
        this.division = vm.division || 0;
        this.tipoId = vm.tipoId || 0;
        this.tipoDescripcion = vm.tipoDescripcion || '';
    }
}
