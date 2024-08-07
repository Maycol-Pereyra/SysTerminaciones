import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'valorAsignado' })
export class ValorAsignadoPipe implements PipeTransform {
  transform(valor: string) {
    if (valor === null || valor === undefined || valor.toString() === '') {
      return '- No Asignado -';
    }

    return valor;
  }
}
