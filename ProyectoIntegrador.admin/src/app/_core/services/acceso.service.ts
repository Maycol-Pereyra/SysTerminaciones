/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mensajes } from '../helpers/mensaje.helper';
import { ToastService } from './toast.service';

@Injectable()
export class AccesosService {
  public onChanged: Subject<any>;

  public get lista(): string[] {
    return this._lista;
  }

  public get estaIniciado(): boolean {
    return this._estaIniciado;
  }

  private _lista: string[];
  private _estaIniciado = false;

  constructor(private _toast: ToastService) {
    this.onChanged = new Subject();
  }

  public setListaAcceso(lista: string[]): void {
    this._lista = lista;
    this._estaIniciado = true;
    this.onChanged.next(lista);
  }

  public existe(acceso: string): boolean {
    if (!this._lista || this._lista.length === 0) {
      return false;
    }

    const item = this._lista.find(o => o.toLocaleLowerCase() === acceso.toLocaleLowerCase());
    if (item) {
      return true;
    }
    return false;
  }

  public hasClaim(claimType: any, claimValue?: any): boolean {
    if (typeof claimType === 'string') {
        return this.isClaimValid(claimType, claimValue);
    } else {
        const claims: string[] = claimType;
        if (claims) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let index = 0; index < claims.length; index++) {
            const ret = this.isClaimValid(claims[index]);
            if (ret) {
              return true;
            }
          }
        }
    }

    return false;
  }

  public isClaimValid(claimType: string, claimValue?: string): boolean {
    if (!this._lista) {
        return false;
    }

    // See if the claim type has a value
    // *hasClaim="'claimType:value'"
    if (claimType.indexOf(':') >= 0) {
        const words: string[] = claimType.split(':');
        claimType = words[0];
        claimValue = words[1];
    } else {
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
    }

    const valor = claimValue.toLowerCase() === 'true' ? true : false;
    const obj = this._lista.indexOf (claimType.toLowerCase());
    const tienePermiso = (obj >= 0);

    return tienePermiso === valor;
  }

  public puedeCrear(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso de creación para esta opción.');
  }

  public puedeEditar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso de edición para esta opción.');
  }

  public puedeCopiar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso a copiar.');
  }

  public puedeInformacion(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso de ver información.');
  }

  public puedeBorrar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso a borrar para esta opción.');
  }

  public puedeAnular(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso para anular.');
  }

  public puedeActivar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso para activar.');
  }

  public puedeInactivar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso para inactivar.');
  }

  public puedeExportar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso para exportar.');
  }

  public puedeIntegrar(acceso: string): boolean {
    return this.puede(acceso, 'Usted no tiene acceso para integrar.');
  }

  public puede(acceso: string, msg: string): boolean {
    if (!this.existe(acceso)) {
      // this._toast.onWarning(msg);
      Mensajes.toastWarning(msg);
      return false;
    }

    return true;
  }
}
