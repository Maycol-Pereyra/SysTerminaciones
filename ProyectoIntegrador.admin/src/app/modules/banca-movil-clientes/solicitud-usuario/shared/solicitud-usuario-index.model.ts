export class SolicitudUsuarioIndex {
    public id: number;
    public nombre: string;
    public apellido: string;
    public correo: string;
    public tipoDocumentoDescripcion: string;
    public documento: string;
    public telefono: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.nombre = vm.nombre || '';
        this.apellido = vm.apellido || '';
        this.correo = vm.correo || '';
        this.tipoDocumentoDescripcion = vm.tipoDocumentoDescripcion || '';
        this.documento = vm.documento || '';
        this.telefono = vm.telefono || '';
    }
}
