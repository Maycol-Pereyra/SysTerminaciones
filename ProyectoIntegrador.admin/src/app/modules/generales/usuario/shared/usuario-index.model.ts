export class UsuarioIndex {
    public id: number;
    public login: string;
    public fechaCreacion: Date;
    public estaActivo: boolean;

    //Propiedades que vienen de entidad
    public nombre: string;
    public apellido: string;
    public cedula: string;
    public rnc: string;
    public pasaporte: string;
    public correo: string;
        
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0,
        this.login = vm.login || '',
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion,
        this.estaActivo = vm.estaActivo || false,
        this.nombre = vm.nombre || '',
        this.apellido = vm.apellido || '',
        this.cedula = vm.cedula || '',
        this.rnc = vm.rnc || '',
        this.pasaporte = vm.pasaporte || '',
        this.correo = vm.correo || ''
    }
}
