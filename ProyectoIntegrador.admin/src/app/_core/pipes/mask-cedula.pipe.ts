import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskCedula' })
export class MaskCedulaPipe implements PipeTransform {
  transform(valor: string) {
    if (valor === null || valor === undefined || valor.toString() === '') {
      return valor;
    }

    const cedula
      = valor
        .replace('-', '')
        .replace('_', '');

    if (cedula.length === 11) {
      return `${cedula.substring(0,3)}-${cedula.substring(3,10)}-${cedula.substring(10,11)}`;
    }

    return valor;
  }
}
