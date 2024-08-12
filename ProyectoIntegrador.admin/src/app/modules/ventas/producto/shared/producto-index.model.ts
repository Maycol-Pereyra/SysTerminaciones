export class ProductoIndex {
    public id: number;
    public descripcion: string;
    public categoriaId: number;
    public categoriaDescripcion: string;
    public tipoProductoId: number;
    public tipoProductoDecripcion: string;
    public colorId: number | null;
    public colorDescripcion: string;
    public fechaCreacion: Date;
    public estaActivo: boolean;
    
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.categoriaId = vm.categoriaId || 0;
        this.categoriaDescripcion = vm.categoriaDescripcion || '';
        this.tipoProductoId = vm.tipoProductoId || 0;
        this.tipoProductoDecripcion = vm.tipoProductoDecripcion || '';
        this.colorId = vm.colorId || 0;
        this.colorDescripcion = vm.colorDescripcion || '';
        this.estaActivo = vm.estaActivo || false;
    }
}
