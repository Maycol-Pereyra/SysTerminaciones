export class AperturaCaja {
    public id: number;
    public cajaId: number;
    public usuarioId: number;
    public fechaApertura: Date;
    public fechaCierre: Date | null;
    public turnoId: number;
    public cuadroCaja: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.cajaId = vm.cajaId || 0;
        this.usuarioId = vm.usuarioId || 0;
        this.fechaApertura = !vm.fechaApertura ? null : vm.fechaApertura;
        this.fechaCierre = !vm.fechaCierre ? null : vm.fechaCierre;
        this.turnoId = vm.turnoId || 0;
        this.cuadroCaja = vm.cuadroCaja || false;
    }

}

