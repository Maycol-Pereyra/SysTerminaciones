export class ProductoUnidad {
    public productoId: number;
    public unidadId: number;
    public unidadDescripcion: string;
    public precioCompra: number;
    public precioVenta: number;
    public precioVentaInstalacion: number;

    constructor(vm: any) {
        vm = vm || {};
        this.productoId = vm.productoId || 0;
        this.unidadId = vm.unidadId || null;
        this.unidadDescripcion = vm.unidadDescripcion || '';
        this.precioCompra = vm.precioCompra || 0;
        this.precioVenta = vm.precioVenta || 0;
        this.precioVentaInstalacion = vm.precioVentaInstalacion || 0;
    }
}
