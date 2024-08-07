export class SucursalIndex {
    public id: number;
    public nombre: string;
    public direccion: string;
    public ciudad: string;
    public correo: string;
    public telefono: string;
    public geolocalizacion: string;
    public sucursalNuevoId: number;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.nombre = vm.nombre || '';
        this.direccion = vm.direccion || '';
        this.ciudad = vm.ciudad || '';
        this.correo = vm.correo || '';
        this.telefono = vm.telefono || '';
        this.geolocalizacion = vm.geolocalizacion || '';
        this.sucursalNuevoId = !vm.sucursalNuevoId ? null: vm.sucursalNuevoId;
    }
}
