import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskTelefono' })
export class MaskTelefonoPipe implements PipeTransform {
  transform(valor: string) {
    if (valor === null || valor === undefined || valor.toString() === '') {
      return valor;
    }

    const telefono
      = valor
        .replace('-', '')
        .replace('_', '');

    if (telefono.length === 10) {
      return `${telefono.substring(0,3)}-${telefono.substring(3,6)}-${telefono.substring(6,10)}`;
    }

    return valor;
  }
}
