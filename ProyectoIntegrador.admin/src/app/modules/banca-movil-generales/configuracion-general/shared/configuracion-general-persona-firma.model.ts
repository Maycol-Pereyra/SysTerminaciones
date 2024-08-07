export class ConfiguracionGeneralPersonaFirma {
    id: number;
    configuracionGeneralId: number;
    sucursalId: number;
    sucursalNombre: string;
    nombre: string;
    puesto: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.configuracionGeneralId = vm.configuracionGeneralId || 0;
        this.sucursalId = vm.sucursalId || 0;
        this.sucursalNombre = vm.sucursalNombre || '';
        this.nombre = vm.nombre || '';
        this.puesto = vm.puesto || '';
    }
}
