import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppGlobalService {
    private storage = sessionStorage; // SE PUEDE USAR SESSIONSTORAGE PARA QUE EL USUARIO SE TENGA UQE HACER LOGIN AL CAMBIAR DE PAGINA.

    public setEnProcesoLogout(value: boolean) {
        const valueStr = value ? '1': '0';
        this.storage.setItem('enProcesoDeLogout', valueStr);
    }

    public getEnProcesoLogout(): boolean {
        const result = this.storage.getItem('enProcesoDeLogout');

        if (result && result.length > 0) {
            const value = JSON.parse(result);
            return value && (value === 1 || value === '1');
        }

        return false;
    }
}
