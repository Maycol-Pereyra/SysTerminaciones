import { Injectable } from '@angular/core';

@Injectable()
export class ListaHelper {

  public static obtenerListaInt(length: number): number[] {
    const lista: number[] = [];

    for (let index = 1; index <= length; index++) {
      lista.push(index);
    }

    return lista;
  }

  public static listaConElemento(lista: any[]): boolean {
    if (lista === null || lista === undefined || lista.length <= 0) {
      return false;
    }

    return true;
  }

  public static listaSinElemento(lista: any[]): boolean {
    return (this.listaConElemento(lista) === false);
  }

  public static agregarItemALista(listaDestino: any[], listaOrigen: any[]): void {
    if (listaDestino === null || listaDestino === undefined) {
      return;
    }

    if (listaOrigen === null || listaOrigen === undefined) {
      return;
    }

    for (const item of listaOrigen) {
      listaDestino.push(item);
    }
  }

  public static eliminarTodosLosElementos(lista: any[]) {

    if (!this.listaSinElemento(lista)) {
      return;
    }

    for (let index = lista.length - 1; index >= 0; index--) {
      lista.splice(index, 1);
    }
  }
}
