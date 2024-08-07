/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Convert string to Date
 *
 * @param dateInStr: string (format => 'dd/MM/yyyy')
 */
export function getDateFromString(dateInStr: string = ''): Date {
  if (dateInStr && dateInStr.length > 0) {
    const dateParts = dateInStr.trim().split('/');
    const year = toInteger(dateParts[2]);
    const month = toInteger(dateParts[1]);
    const day = toInteger(dateParts[0]);
    const result = new Date();
    result.setFullYear(year);
    result.setMonth(month - 1);
    result.setDate(day);
    return result;
  }

  return new Date();
}

export function getDateNullFromString(dateInStr: string = ''): Date | null {
  if (dateInStr && dateInStr.length > 0) {
    const dateParts = dateInStr.trim().split('/');
    if (dateParts.length !== 3) {
      return null;
    }
    const year = toInteger(dateParts[2]);
    const month = toInteger(dateParts[1]);
    const day = toInteger(dateParts[0]);
    const result = new Date();
    result.setFullYear(year);
    result.setMonth(month - 1);
    result.setDate(day);
    return result;
  }
  return null;
}
export function getStringFromDate(value: Date | null): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const DELIMITER = '/';
  return `${value.getDate()}` + DELIMITER + `${(value.getMonth() + 1)}` + DELIMITER + `${value.getFullYear()}`;
}
/**
 * Covert value to number
 *
 * @param value: any
 */
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function getFechaValida(ano: number, mes: number, dia: number): Date {
  // El mes inicia en cero. 0 = enero, 11 = diciembre.
  const ultimoDiaMes = getCantidadDiasMes(ano, mes);

  if (dia > ultimoDiaMes) {
    dia = ultimoDiaMes;
  }

  return new Date(ano, mes, dia);
}

export function getCantidadDiasMes(ano, mes): number {
  // El mes inicia en cero. 0 = enero, 11 = diciembre.
  return [
    31,
    esBisiesto(ano) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31][mes];
}

export function esBisiesto(ano: number): boolean {
  const multiploDeCuatroYNoDeCien = ano % 4 === 0 && ano % 100 !== 0;

  return multiploDeCuatroYNoDeCien || ano % 400 === 0;
}
