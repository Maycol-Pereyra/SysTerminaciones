import { PerfilAcceso } from './perfil-acceso.model';

export class Perfil {
    id: number;
    descripcion: string;
    estaActivo: boolean;
    listaDetalle: PerfilAcceso [];

    constructor(vm: any) {
        vm = vm || {};
        this.id = vm.id || 0;
        this.descripcion = vm.descripcion || '';
        this.estaActivo = !vm.estaActivo ? true : vm.estaActivo;
        this.listaDetalle = this.mapAcceso(vm.listaAcceso);
    }

    private mapAcceso(lista: any[]): PerfilAcceso[] {
        const res: PerfilAcceso[] = [];

        if (lista) {
            lista.forEach(item => {
                res.push(new PerfilAcceso(item));
            });
        }

        return res;
    }
}
