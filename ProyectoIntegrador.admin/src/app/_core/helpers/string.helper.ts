import { Injectable } from '@angular/core';

@Injectable()
export class StringHelper {
  public static advReplace(texto: string, valor: string, nuevoValor: string) {
    while (texto.indexOf(valor) >= 0) {
      texto = texto.replace(valor, nuevoValor);
    }

    return texto;
  }

  /** @description se utiliza retornar un valor string en caso de ser nullo o indefinido retorna en blanco
   * @alias fStr
   */
  public static obtenerValorString(texto: any): string {
    if (texto === undefined || texto === null) {
      return '';
    }

    return `${texto}`;
  }

  public static sanearStringParaUrl(texto: string): string {
    texto = texto
        .replace(' ', '%20')
        .replace('!', '%21')
        .replace('\'', '%22')
        .replace('#', '%23')
        .replace('$', '%24')
        .replace('%', '%25')
        .replace('&', '%26')
        .replace('\'', '%27')
        .replace('(', '%28')
        .replace(')', '%29')
        .replace('*', '%2A')
        .replace('+', '%2B')
        .replace(',', '%2C')
        .replace('-', '%2D')
        .replace('.', '%2E')
        .replace('/', '%2F')

        .replace(':', '%3A')
        .replace(';', '%3B')
        .replace('<', '%3C')
        .replace('=', '%3D')
        .replace('>', '%3E')
        .replace('?', '%3F')

        .replace('@', '%40')
        .replace('[', '%5B')
        .replace('\\', '%5C')
        .replace(']', '%5D')
        .replace('^', '%5E')
        .replace('_', '%5F')

        .replace('`', '%60')

        .replace('{', '%7B')
        .replace('|', '%7C')
        .replace('}', '%7D')
        .replace('~', '%7E')

        .replace('ñ', '%F1')
        .replace('Ñ', '%D1')
        ;

    return texto;
  }
}
