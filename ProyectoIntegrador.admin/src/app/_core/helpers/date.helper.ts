import { Injectable } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NumberHelper } from './number.helper';

@Injectable()
export class DateHelper {

  public static addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public static obtenerEstructuraTime(arg: string): NgbTimeStruct {
    // La hora se maneja en formato de 24 horas
    const time = {
      hour: 0,
      minute: 0,
      second: 0,
    };

    if (arg === null || arg === undefined || arg === '' || arg.length < 8) {
      return time;
    }

    time.hour = NumberHelper.obtenerValorNumerico(arg.substr(0, 2));
    time.minute = NumberHelper.obtenerValorNumerico(arg.substr(3, 2));

    return time;
  }

  public static equivalencia12Hora(hora: number) {
    if (hora > 12) {
      return hora - 12;
    }

    if (hora <= 0) {
      return 12;
    }

    return hora;
  }

  public static equivalencia24Hora(hora: number, meridiano: string) {
    if (meridiano.toLowerCase() === 'am') {
      return hora;
    } else {
      return hora + 12;
    }
  }

  public static convertirAFecha(valor: string, separador = '/'): Date | null {
    if (!valor) {
      return null;
    }

    const fecha = valor.split(separador);

    if (fecha.length <= 2) {
      return null;
    }

    const fNum = NumberHelper.obtenerValorNumerico;

    return new Date(fNum(fecha[2]), fNum(fecha[1]) - 1, fNum(fecha[0]));
  }

  static tiempoEnMesAno(fechaEvaluar: Date, fechaActual: Date): any {
    if (!fechaEvaluar || fechaEvaluar === null) {
      return null;
    }

    let ano = 1;
    while (this.addYears(fechaEvaluar, ano) <= fechaActual)
    {
        ano++;
    }

    ano--;

    const fecha = this.addYears(fechaEvaluar, ano);

    let mes = 1;
    while (this.addMonths(fecha, mes) <= fechaActual)
    {
        mes++;
    }

    mes--;

    return { mes, ano };
  }

  static addYears(date: Date, years: number): Date {
    if (!date || date === null) { return null; }

    const copyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    copyDate.setFullYear(copyDate.getFullYear() + years);

    return copyDate;
  }

  static addMonths(date: Date, month: number): Date {
    if (!date || date === null) { return null; }

    const copyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    copyDate.setMonth(copyDate.getMonth() + month);

    return copyDate;
  }
}
