export class InformacionCuentaBancoIndex {
    public id: number;
    public banco: string;
    public numeroCuenta: string;
    public tipoCuenta: string;
    public identificacion: string;
    public beneficiario: string;
    public nota: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.banco = vm.banco || '';
        this.numeroCuenta = vm.numeroCuenta || '';
        this.tipoCuenta = vm.tipoCuenta || '';
        this.identificacion = vm.identificacion || '';
        this.beneficiario = vm.beneficiario || '';
        this.nota = vm.nota || '';
    }
}
