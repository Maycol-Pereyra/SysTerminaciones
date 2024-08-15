import { EntidadDireccion } from "src/app/modules/generales/empleado/shared/entidad-direccion.model";
import { EntidadTelefono } from "src/app/modules/generales/empleado/shared/entidad-telefono.model";

export class Suplidor {
    public id: number; 
    public entidadId: number; 
    public estaActivo: boolean;
    
    //Propiedades que vienen de entidad
    public nombre: string;
    public apellido: string;
    public cedula: string;
    public rnc: string;
    public esRncCedula: boolean;
    public pasaporte: string;
    public correo: string;
    public listaEntidadDireccion: EntidadDireccion[];
    public listaEntidadTelefono: EntidadTelefono[];

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.entidadId = vm.entidadId || 0;
        this.estaActivo = vm.estaActivo || false;
        this.nombre = vm.nombre || '';
        this.apellido = vm.apellido || '';
        this.cedula = vm.cedula || '';
        this.rnc = vm.rnc || '';
        this.esRncCedula = vm.esRncCedula || false;
        this.pasaporte = vm.pasaporte || '';
        this.correo = vm.correo || '';
        this.listaEntidadDireccion = !vm.listaEntidadDireccion ? [] : vm.listaEntidadDireccion;
        this.listaEntidadTelefono = !vm.listaEntidadTelefono ? [] : vm.listaEntidadTelefono;
    }
}
