export class Cliente {
  id: number;
  identificador: string;
  nombre: string;
  apellido: string;
  correo: string;
  cedula: string;
  pasaporte: string;
  rnc: string;


  constructor(vm: any = null) {
    vm = vm || {};
    this.id = vm.id || 0;
    this.identificador = vm.identificador || '';
    this.nombre = vm.nombre || '';
    this.apellido = vm.apellido || '';
    this.correo = vm.correo || '';
    this.cedula = vm.cedula || '';
    this.pasaporte = vm.pasaporte || '';
    this.rnc = vm.rnc || '';
  }

  clear() {
    this.id = 0;
    this.identificador = '';
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.cedula = '';
    this.pasaporte = '';
    this.rnc = '';
  }
}
