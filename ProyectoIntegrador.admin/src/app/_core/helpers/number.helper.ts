import { Injectable } from '@angular/core';

@Injectable()
export class NumberHelper {

  public static obtenerValorNumerico(value): number {
    if (value === undefined || value === null || isNaN(value)) {
      return 0;
    }

    return +value;
  }
}
