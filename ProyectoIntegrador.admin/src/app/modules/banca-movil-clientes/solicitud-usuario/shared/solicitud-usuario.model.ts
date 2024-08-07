import { SolicitudUsuarioRelacionado } from './solicitud-usuario-relacionado.model';

export class SolicitudUsuario {
    public id: number;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public tipoDocumentoId: number;
    public tipoDocumentoDescripcion: string;
    public documento: string;
    public login: string;
    public telefono: string;
    public tipoProductoId: number;
    public tipoProductoDescripcion: string;
    public productoNumero: string;
    public listaRelacionado: SolicitudUsuarioRelacionado [];

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.nombre = vm.nombre || '';
        this.apellido = vm.apellido || '';
        this.correo = vm.correo || '';
        this.tipoDocumentoId = !vm.tipoDocumentoId ? null : vm.tipoDocumentoId;
        this.tipoDocumentoDescripcion = vm.tipoDocumentoDescripcion || '';
        this.documento = vm.documento || '';
        this.login = vm.login || '';
        this.telefono = vm.telefono || '';
        this.tipoProductoId = !vm.tipoProductoId ? null : vm.tipoProductoId;
        this.tipoProductoDescripcion = vm.tipoProductoDescripcion || '';
        this.productoNumero = vm.productoNumero || '';
        this.listaRelacionado = this.mapRelacionado(vm.listaRelacionado);
    }

    private mapRelacionado(lista: any []): SolicitudUsuarioRelacionado [] {
        const resul: SolicitudUsuarioRelacionado[] = [];

        if (lista) {
            lista.forEach(item => {
                resul.push(new SolicitudUsuarioRelacionado(item));
            });
        }

        return resul;
    }
}
