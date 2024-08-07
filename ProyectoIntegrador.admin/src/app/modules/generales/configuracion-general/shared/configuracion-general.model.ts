export class ConfiguracionGeneral {
    id: number;
    enviarNotificacionRecuperacionClave: boolean;
    enviarNotificacionRecuperacionClaveCorreoEspecificado: boolean;
    correoNotificacionRecuperacionClave: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.enviarNotificacionRecuperacionClave = vm.enviarNotificacionRecuperacionClave || false;
        this.enviarNotificacionRecuperacionClaveCorreoEspecificado = vm.enviarNotificacionRecuperacionClaveCorreoEspecificado || false;
        this.correoNotificacionRecuperacionClave = vm.correoNotificacionRecuperacionClave || '';
    }
}
