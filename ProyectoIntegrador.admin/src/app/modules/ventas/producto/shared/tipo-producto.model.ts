export class TipoProducto {
    public id: number;
    public descripcion: string;
    public usaMedidaAncho: boolean;
    public usaMedidaAlto: boolean;
    public usaDescuento: boolean;
    public usaDivision: boolean;
    public usaInstalacion: boolean;
    
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.usaMedidaAncho = vm.usaMedidaAncho || false;
        this.usaMedidaAlto = vm.usaMedidaAlto || false;
        this.usaDescuento = vm.usaDescuento || false;
        this.usaDivision = vm.usaDivision || false;
        this.usaInstalacion = vm.usaInstalacion || false;
    }
}
