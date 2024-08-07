import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidacionHelper {
  public static cedulaModulo10Validator(validar: boolean) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (validar) {
        if (control.value !== null && control.value.length > 0 && this.validaDigitoVerificadorCedulaModulo10(control.value) === false) {
          return { cedulaModulo10Validator: true };
        }
      }
      return null;
    };
  }

  public static rncModulo11Validator(validar: boolean) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (validar) {
        if (control.value !== null  && control.value.length > 0 && this.validaDigitoVerificadorRncModulo11(control.value) === false) {
          return { rncModulo11Validator: true };
        }
      }

      return null;
    };
  }

  public static validaDigitoVerificadorCedulaModulo10(value: string): boolean {
    let cedula = value;

    while (cedula.indexOf('-') >= 0) {
      cedula = cedula.replace('-', '');
    }

    if (cedula.length !== 11) {
      return false;
    }

    if (cedula === '00000000000') {
      return false;
    }

    const multiplo = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    let total = 0;

    for (let index = 0; index < 10; index++) {
      let valor = +cedula[index] * multiplo[index];
      if (valor >= 10) {
        valor = valor - 9;
      }
      total += valor;
    }

    const residuo = total % 10;
    let verificador = 10 - residuo;
    if (verificador === 10) {
      verificador = 0;
    }

    return verificador === +cedula[10];
  }

  public static validaDigitoVerificadorRncModulo11(value: string): boolean {
    let rnc = value;

    while (rnc.indexOf('-') >= 0) {
      rnc = rnc.replace('-', '');
    }

    if (rnc.length !== 9) {
      return false;
    }

    if (rnc === '000000000') {
      return false;
    }

    const multiplo = [7, 9, 8, 6, 5, 4, 3, 2];
    let total = 0;

    for (let index = 0; index < 8; index++) {
      const valor = +rnc[index] * multiplo[index];
      total += valor;
    }

    const residuo = total % 11;
    let verificador = 11 - residuo;

    if (verificador === 10) {
      verificador = 1;
    } else if (verificador === 11) {
      verificador = 2;
    }

    return verificador === +rnc[8];
  }
}
