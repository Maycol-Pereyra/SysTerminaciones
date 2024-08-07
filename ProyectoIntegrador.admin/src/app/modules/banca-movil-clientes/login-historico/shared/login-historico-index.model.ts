export class LoginHistoricoIndex {
    id: number;
    fechaCreacionUtc: Date;
    fechaCreacionLocal: Date;
    login: string;
    origen: string;
    eemoteIp: string;
    entradaValida: boolean;
    clientName: string;
    clientVersion: string;
    clientDevice: string;
    clientOsVersion: string;


    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.fechaCreacionUtc = !vm.fechaCreacionUtc ? null : vm.fechaCreacionUtc;
        this.fechaCreacionLocal = !vm.fechaCreacionLocal ? null : vm.fechaCreacionLocal;
        this.login = vm.login || '';
        this.origen = vm.origen || '';
        this.eemoteIp = vm.eemoteIp || '';
        this.entradaValida = vm.entradaValida === undefined ? false : vm.entradaValida;
        this.clientName = vm.clientName || '';
        this.clientVersion = vm.clientVersion || '';
        this.clientDevice = vm.clientDevice || '';
        this.clientOsVersion = vm.clientOsVersion || '';
    }
}
