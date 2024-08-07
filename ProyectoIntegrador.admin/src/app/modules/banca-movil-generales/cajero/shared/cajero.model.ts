export class Cajero {
    public id: number;
    public nombreEstablecimiento: string;
    public direccion: string;
    public ciudad: string;
    public geolocalizacion: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.nombreEstablecimiento = vm.nombreEstablecimiento || '';
        this.direccion = vm.direccion || '';
        this.ciudad = vm.ciudad || '';
        this.geolocalizacion = vm.geolocalizacion || '';
    }
}
