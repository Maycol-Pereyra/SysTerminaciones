import { FacturaDetalle } from "./factura-detalle.model";

export class Factura {
    public id: number;
    public clienteId: number;
    public clienteNombre: string;
    public numeroFactura: string;
    public medioPagoId: number;
    public monto: number;
    public balancePendiente: number;
    public descuento: number;
    public impuesto: number;
    public tipoComprobanteId: number;
    public comprobante: string;
    public nota: string;
    public llevaEnvio: boolean;
    public llevaInstalacion: boolean;
    public direccionId: number | number;
    public telefonoId: number;
    public telefonoDescripcion: string;
    public usuarioCreacionId: number;
    public usuarioCreacionNombre: string;
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
    
    public listaDetalle: FacturaDetalle[]; 

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.clienteId = vm.clienteId || null;
        this.clienteNombre = vm.clienteNombre || '';
        this.numeroFactura = vm.numeroFactura || '';
        this.medioPagoId = vm.medioPagoId || null;
        this.monto = vm.monto || 0;
        this.balancePendiente = vm.balancePendiente || 0;
        this.descuento = vm.descuento || 0;
        this.impuesto = vm.impuesto || 0;
        this.tipoComprobanteId = vm.tipoComprobanteId || null;
        this.comprobante = vm.comprobante || '';
        this.nota = vm.nota || '';
        this.llevaEnvio = vm.llevaEnvio || false;
        this.llevaInstalacion = vm.llevaInstalacion || false;
        this.direccionId = vm.direccionId || null;
        this.telefonoId = vm.telefonoId || null;
        this.telefonoDescripcion = vm.telefonoDescripcion || '';
        this.usuarioCreacionId = vm.usuarioCreacionId || 0;
        this.usuarioCreacionNombre = vm.usuarioCreacionNombre || '';
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion;
        this.estadoId = vm.estadoId || 0;
        this.estadoDescripcion = vm.estadoDescripcion || '';
        this.calle = vm.calle || '';
        this.casa = vm.casa || '';
        this.referencia = vm.referencia || '';
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
