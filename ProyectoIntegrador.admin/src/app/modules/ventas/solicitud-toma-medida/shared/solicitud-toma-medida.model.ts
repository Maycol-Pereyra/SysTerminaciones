import { SolicitudTomaMedidaDetalle } from "./solicitud-toma-medida-detalle.model";

export class SolicitudTomaMedida {
    public id: number;
    public clienteId: number;
    public clienteNombre: string;
    public direccionId: number;
    public empleadoAsignadoId: number | null;
    public empleadoAsignadoNombre: string;
    public vehiculoAsignadoId: number | null;
    public vehiculoAsignadoDescripcion: string;
    public fechaCompromisoTomaMedida: Date | null;
    public fechaTomaMedida: Date | null;
    public estadoId: number;
    public estadoDescripcion: string;
    public calle: string;
    public casa: string;
    public referencia: string;
    public paisId: number;
    public provinciaId: number;
    public ciudadId: number;
    public sectorId: number;
    public paisDescripcion: string;
    public provinciaDescripcion: string;
    public ciudadDescripcion: string;
    public sectorDescripcion: string;



    public listaDetalle: SolicitudTomaMedidaDetalle[];

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || null;
        this.clienteNombre = vm.clienteNombre || '';
        this.direccionId = vm.direccionId || null;
        this.empleadoAsignadoId = vm.empleadoAsignadoId || null;
        this.empleadoAsignadoNombre = vm.empleadoAsignadoNombre || '';
        this.vehiculoAsignadoId = vm.vehiculoAsignadoId || null;
        this.vehiculoAsignadoDescripcion = vm.vehiculoAsignadoDescripcion || '';
        this.fechaCompromisoTomaMedida = !vm.fechaCompromisoTomaMedida ? null : vm.fechaCompromisoTomaMedida;
        this.fechaTomaMedida = !vm.fechaTomaMedida ? null : vm.fechaTomaMedida;
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || '';
        this.calle = vm.calle || '';
        this.casa = vm.casa || '';
        this.referencia = vm.referencia || '';
        this.paisId = vm.paisId || 0;
        this.provinciaId = vm.provinciaId || 0;
        this.ciudadId = vm.ciudadId || 0;
        this.sectorId = vm.sectorId || 0;
        this.paisDescripcion = vm.paisDescripcion || '';
        this.provinciaDescripcion = vm.provinciaDescripcion || '';
        this.ciudadDescripcion = vm.ciudadDescripcion || '';
        this.sectorDescripcion = vm.sectorDescripcion || '';

        this.listaDetalle = !vm.listaDetalle ? [] : vm.listaDetalle;
    }
}
