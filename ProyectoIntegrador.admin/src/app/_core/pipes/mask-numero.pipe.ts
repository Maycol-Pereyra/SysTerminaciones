import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { NumberHelper } from '../helpers/number.helper';
import { StringHelper } from '../helpers/string.helper';

@Pipe({ name: 'maskNumero' })
export class MaskNumeroPipe implements PipeTransform {
  transform(valor: string, tipo: string = '') {
    const cPipe = new DecimalPipe('en');

    if (valor === null || valor === undefined || valor.toString() === '') {
      return tipo === 'd' || tipo === '' ? '0.00' : '0';
    }

    let numero = StringHelper.advReplace(valor, '$', '');
    numero = StringHelper.advReplace(numero, ',', '');

    if (isNaN(numero as any)) {
      return tipo === 'd' || tipo === '' ? '0.00' : '0';
    }

    if (tipo === 'd') {
      return cPipe.transform(numero, '1.2-2');
    } else if (tipo === 'n') {
      return cPipe.transform(numero, '1.0-0');
    } else if (tipo === 'sf') {
      return NumberHelper.obtenerValorNumerico(numero);
    } else {
      return cPipe.transform(numero, '1.2-2');
    }
  }
}
