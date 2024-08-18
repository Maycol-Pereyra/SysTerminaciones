import { Injectable } from '@angular/core';
import { listaTipoProductoPieCuadrdadoId } from '../const/tipo-producto-pie-cuadrado.const';
import { NumeroMixto } from '../models/numero-mixto.model';

@Injectable()
export class NumeroMixtoHelper {

  public static obtenerPrecioProducto( tipoProductoId: number, medidaAnchoString: string, medidaAltoString: string, cantidad: number, precioUnitario: number): number {
    //SI LA MEDIDA ES POR PIE CUADRADO
    if (listaTipoProductoPieCuadrdadoId.includes(tipoProductoId)) {
        const pieCuadrado = this.obtenerPieCuadrado(medidaAnchoString, medidaAltoString);

        return (+pieCuadrado * +cantidad * +precioUnitario);
    }

    //TODO: AGREGAR SI ES POR PIE LINEAL

    return (+cantidad * +precioUnitario);
  }

  public static obtenerPieCuadrado(medidaAncho: string, medidaAlto: string): number {
    const medidaAnchoMixto = new NumeroMixto(medidaAncho);
    const medidaAltoMixto = new NumeroMixto(medidaAlto);

    const pieCuadrado = (((+medidaAnchoMixto.numeroEntero * +medidaAltoMixto.numeroEntero) / 1.44) / 100);

    //TODO: cuando se tenga la configuracion general agregar la cantidad de pies cuadrados minimos por tipo de producto
    return pieCuadrado >= 16
        ? pieCuadrado
        : 16;
  }
}
