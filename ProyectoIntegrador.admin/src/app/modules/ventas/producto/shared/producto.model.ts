import { ProductoUnidad } from "./producto-unidad.model";

export class Producto {
    public id: number;
    public descripcion: string;
    public descripcionCliente: string;
    public categoriaId: number;
    public suplidorId: number;
    public tipoProductoId: number;
    public colorId: number | null;
    public medidaAncho: number;
    public medidaAlto: number;
    public tipoMedidaId: number;
    public estaActivo: boolean;

    public listaProductoUnidad: ProductoUnidad[];


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.descripcionCliente = vm.descripcionCliente || '';
        this.categoriaId = vm.categoriaId || null;
        this.suplidorId = vm.suplidorId || null;
        this.tipoProductoId = vm.tipoProductoId || null;
        this.colorId = vm.colorId || null;
        this.medidaAncho = vm.medidaAncho || 0;
        this.medidaAlto = vm.medidaAlto || 0;
        this.tipoMedidaId = vm.tipoMedidaId || null;
        this.estaActivo = vm.estaActivo || false;

        this.listaProductoUnidad = !vm.listaProductoUnidad ? [] : vm.listaProductoUnidad;
    }
}
