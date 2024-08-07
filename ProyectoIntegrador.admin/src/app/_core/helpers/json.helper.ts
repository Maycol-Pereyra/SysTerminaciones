import { Injectable } from '@angular/core';

@Injectable()
export class JsonHelper {

  private static iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  /** @description se utiliza para retornar un objeto Nuevo formateado como Json y tomando
   * en cuenta los valores de fecha para darle formato correcto
   */
  public static nuevoObjetoJson(value: any): any {

    if (value === null || value === undefined) {
      return null;
    }

    const obj = JSON.stringify(value);

    return (JSON.parse(obj, this.reviver));
  }

  private static reviver(key: any, value: any): any {

    const esFecha = JsonHelper.iso8601.test(value);

    if (esFecha) {
      value = new Date(value);
    }
    return value;
  }
}
