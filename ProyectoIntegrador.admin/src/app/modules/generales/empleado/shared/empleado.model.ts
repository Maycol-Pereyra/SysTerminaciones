import { EntidadDireccion } from "./entidad-direccion.model";
import { EntidadTelefono } from "./entidad-telefono.model";

export class Empleado {
    public id: number;
    public entidadId: number;
    public sueldo: number;
    public posicionId: number;
    public departamentoId: number;
    public fechaIngreso: Date;
    public fechaTerminoContrato: Date;
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
        this.sueldo = vm.sueldo || 0;
        this.posicionId = vm.posicionId || 0;
        this.departamentoId = vm.departamentoId || 0;
        this.fechaIngreso = !vm.fechaIngreso ? null : vm.fechaIngreso;
        this.fechaTerminoContrato = !vm.fechaTerminoContrato ? null : vm.fechaTerminoContrato;
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
