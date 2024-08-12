export class EntidadDireccion {
    public id: number;
    public entidadId: number;
    public descripcion: string;
    public calle: string;
    public casa: string;
    public referencia: string;
    public paisId: number;
    public provinciaId: number;
    public ciudadId: number;
    public sectorId: number;
    public fechaCreacion: Date;
    public estaActivo: boolean;



    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.entidadId = vm.entidadId || 0;
        this.descripcion = vm.descripcion || '';
        this.calle = vm.calle || '';
        this.casa = vm.casa || '';
        this.referencia = vm.referencia || '';
        this.paisId = vm.paisId || 0;
        this.provinciaId = vm.provinciaId || 0;
        this.ciudadId = vm.ciudadId || 0;
        this.sectorId = vm.sectorId || 0;
        this.fechaCreacion = !vm.fechaCreacion ? null : vm.fechaCreacion;
        this.estaActivo = vm.estaActivo || false;
    }
}
