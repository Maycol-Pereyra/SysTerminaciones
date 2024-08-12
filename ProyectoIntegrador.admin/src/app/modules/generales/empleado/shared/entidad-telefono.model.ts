export class EntidadTelefono {
    public id: number;
    public descripcion: string;
    public telefono: string;
    public entidadId: number;
    public fechaCreacion: Date;
    public estaActivo: boolean;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0; 
        this.descripcion = vm.descripcion || '';
        this.telefono = vm.telefono || '';
        this.entidadId = vm.entidadId || 0;
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion;
        this.estaActivo = vm.estaActivo || false;
    }
}
