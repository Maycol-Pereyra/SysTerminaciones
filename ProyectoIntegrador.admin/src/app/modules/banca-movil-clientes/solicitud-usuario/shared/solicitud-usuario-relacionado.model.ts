export class SolicitudUsuarioRelacionado {
    public clienteId: number;
    public nombreCompleto: string;
    public cedula: string;
    public pasaporte: string;
    public rnc: string;
    public tipoProductoId: number;
    public productoNumero: string;

    constructor(vm: any) {
        vm = vm || {};
        this.clienteId = !vm.clienteId ? null : vm.clienteId;
        this.nombreCompleto = vm.nombreCompleto || '';
        this.cedula = vm.cedula || '';
        this.pasaporte = vm.pasaporte || '';
        this.rnc = vm.rnc || '';
        this.tipoProductoId = !vm.tipoProductoId ? null : vm.tipoProductoId;
        this.productoNumero = vm.productoNumero || '';
    }
}
