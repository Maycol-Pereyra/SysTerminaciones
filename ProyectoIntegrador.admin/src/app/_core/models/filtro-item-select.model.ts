import { FiltroItem } from './filtro-item.model';

export class FiltroItemSelect {
  criterio: string;
  filtros: FiltroItem [];
  desde: number;
  hasta: number;
  elementoId: number;
  elementoExcluirId: number;

  constructor(vm: any = null) {
    vm = vm || {};
    this.criterio = vm.criterio || '';
    this.filtros = vm.filtros || [];
    this.desde = vm.desde || 1;
    this.hasta = vm.hasta || 5;
    this.elementoId = vm.elementoId || null;
    this.elementoExcluirId = vm.elementoExcluirId || null;
  }

  clear() {
    this.criterio = '';
    this.filtros = [];
    this.desde = 1;
    this.hasta = 5;
    this.elementoId = null;
    this.elementoExcluirId = null;
  }
}
