export class TipoCertificacion {
    public id: number;
    public tipoCertificacionInternaId: number | null;
    public descripcion: string;
    public nota: string;
    public estaActivo: boolean;
    public notaPieCertificacion: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.tipoCertificacionInternaId = vm.tipoCertificacionInternaId || null;
        this.descripcion = vm.descripcion || '';
        this.nota = vm.nota || '';
        this.estaActivo = vm.estaActivo || false;
        this.notaPieCertificacion = vm.notaPieCertificacion || '';
    }
}
