import { UsuarioPerfil } from "./usuario-perfil.model";

export class Usuario {
    public id: number;
    public empleadoId: number | null;
    public login: string;
    public password: string;
    public fechaModificacion: Date;
    public fechaCreacion: Date;
    public estaActivo: boolean;
    public token: string;

    //Propiedades que vienen de entidad
    public nombre: string;
    public apellido: string;
    public cedula: string;
    public rnc: string;
    public pasaporte: string;
    public correo: string;

    public listaUsuarioPerfil: UsuarioPerfil[];
        
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0,
        this.empleadoId = vm.empleadoId || null,
        this.login = vm.login || '',
        this.password = vm.password || '',
        this.fechaModificacion = !vm.fechaModificacion ? null : vm.fechaModificacion,
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion,
        this.estaActivo = vm.estaActivo || false,
        this.token = vm.token || '',
        this.nombre = vm.nombre || '',
        this.apellido = vm.apellido || '',
        this.cedula = vm.cedula || '',
        this.rnc = vm.rnc || '',
        this.pasaporte = vm.pasaporte || '',
        this.correo = vm.correo || '',
        this.listaUsuarioPerfil = !vm.listaUsuarioPerfil ? [] : vm.listaUsuarioPerfil
    }
}
