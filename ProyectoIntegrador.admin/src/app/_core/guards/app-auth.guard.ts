/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Mensajes } from '../helpers/mensaje.helper';
import { AccesosService } from '../services/acceso.service';

import { AuthenticationService } from '../services/authentication.service';
import { AppGlobalService } from '../services/app-global.service';

@Injectable()
export class AppAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private appGlobalService: AppGlobalService,
        private _accesosService: AccesosService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {

            if (route.data && route.data.acceso && this._accesosService.lista) {
                const resul = this._accesosService.hasClaim(route.data.acceso);
                if (resul === false) {
                    Mensajes.toastWarning('No tienes acceso a esta opción');
                    return false;
                }
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigateByUrl('/auth/login');
        if (this.appGlobalService.getEnProcesoLogout()) {
            this.appGlobalService.setEnProcesoLogout(false);
            // this.router.navigateByUrl('/auth/login');
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/inicio' }});
            return false;
        }

        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
