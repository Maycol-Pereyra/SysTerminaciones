export class SucursalContactoIndex {
    public id: number;
    public sucursalId: number;
    public sucursalNombre: string;
    public nombre: string;
    public departamento: string;
    public ciudad: string;
    public telefono: string;
    public correo: string;

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.sucursalId = !vm.sucursalId ? null : vm.sucursalId;
        this.sucursalNombre = vm.sucursalNombre || '';
        this.nombre = vm.nombre || '';
        this.departamento = vm.departamento || '';
        this.telefono = vm.telefono || '';
        this.correo = vm.correo || '';
    }
}
