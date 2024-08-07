export class EmpresaConfiguracionGeneral {
    public procesoCierre: boolean;
    public bloquearPorProcesoCierre: boolean;

    constructor(vm: any) {
        vm = vm || {};
        this.procesoCierre = vm.procesoCierre || false;
        this.bloquearPorProcesoCierre = vm.bloquearPorProcesoCierre || false;
    }
}
