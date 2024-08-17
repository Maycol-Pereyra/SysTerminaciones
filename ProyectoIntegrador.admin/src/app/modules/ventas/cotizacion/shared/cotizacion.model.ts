import { CotizacionDetalle } from "./cotizacion-detalle.model";

export class Cotizacion {
    public id: number;
    public clienteId: number;
    public clienteNombre: string;
    public numeroCotizacion: string;
    public monto: number;
    public descuento: number;
    public impuesto: number;
    public tipoComprobanteId: number;
    public comprobante: string;
    public nota: string;
    public llevaEnvio: boolean;
    public llevaInstalacion: boolean;
    public usuarioCreacionId: number;
    public usuarioCreacionNombre: string;
    public direccionId: number | null;
    public telefonoId: number;
    public solicitudTomaMedidaId: number | null;
    public fechaCreacion: Date;
    public estadoId: number;
    public estadoDescripcion: string;
    public calle: string;
    public casa: string;
    public referencia: string;
    public paisId: number;
    public paisDescripcion: string;
    public provinciaId: number;
    public provinciaDescripcion: string;
    public ciudadId: number;
    public ciudadDescripcion: string;
    public sectorId: number;
    public sectorDescripcion: string;


    public listaDetalle: CotizacionDetalle[]; 
    
    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || null;
        this.clienteNombre = vm.clienteNombre || '';
        this.numeroCotizacion = vm.numeroCotizacion || '';
        this.monto = vm.monto || 0;
        this.descuento = vm.descuento || 0;
        this.impuesto = vm.impuesto || 0;
        this.tipoComprobanteId = vm.tipoComprobanteId || 0;
        this.comprobante = vm.comprobante || '';
        this.nota = vm.nota || '';
        this.llevaEnvio = vm.llevaEnvio || false;
        this.llevaInstalacion = vm.llevaInstalacion || false;
        this.usuarioCreacionId = vm.usuarioCreacionId || null;
        this.usuarioCreacionNombre = vm.usuarioCreacionNombre || '';
        this.direccionId = vm.direccionId || null;
        this.telefonoId = vm.telefonoId || null;
        this.solicitudTomaMedidaId = vm.solicitudTomaMedidaId || null;
        this.fechaCreacion = vm.fechaCreacion || 0;
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || 0;
        this.calle = vm.calle || 0;
        this.casa = vm.casa || 0;
        this.referencia = vm.referencia || 0;
        this.paisId = vm.paisId || 0;
        this.paisDescripcion = vm.paisDescripcion || '';
        this.provinciaId = vm.provinciaId || 0;
        this.provinciaDescripcion = vm.provinciaDescripcion || '';
        this.ciudadId = vm.ciudadId || 0;
        this.ciudadDescripcion = vm.ciudadDescripcion || '';
        this.sectorId = vm.sectorId || 0;
        this.sectorDescripcion = vm.sectorDescripcion || '';

        this.listaDetalle = !vm.listaDetalle ? [] : vm.listaDetalle;
    }
}
