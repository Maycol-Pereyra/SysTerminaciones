import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FeatureFlagService } from '../services/feature-flag.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagGuard implements CanActivate {

  constructor(private featureFlagService: FeatureFlagService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let vm = this.featureFlagService.vm;
    if (!vm) {
      return this.featureFlagService
        .getFeatureFlag()
        .pipe(
          map((data) => {
            vm = data;
            return this.esValido(route, vm);
          })
        );
    }

    return this.esValido(route, vm);
  }

  private esValido(route: ActivatedRouteSnapshot, vm: any): boolean {
    if (route.data && route.data.feature) {
      if (route.data.feature === 'BancaMovil' && vm.bancaMovil === false) {
        return false;
      }

      if (route.data.feature === 'SolicitudPrestamos' && vm.solicitudPrestamos === false) {
        return false;
      }

      if (route.data.feature === 'Prospeccion' && vm.prospeccion === false) {
        return false;
      }

      if (route.data.feature === 'GestionCredito' && vm.gestionCredito === false) {
        return false;
      }

      if (route.data.feature === 'GestionCreditoAnalisisCredito' && vm.gestionCreditoAnalisisCredito === false) {
        return false;
      }

      if (route.data.feature === 'GestionCreditoAnalisisAprobacion' && vm.gestionCreditoAnalisisAprobacion === false) {
        return false;
      }

      if (route.data.feature === 'IndicadoresAprobaciones' && vm.indicadoresAprobaciones === false) {
        return false;
      }

      if (route.data.feature === 'IndicadoresAprobacionesCarreraSueldo' && vm.IndicadoresAprobacionesCarreraSueldo === false) {
        return false;
      }

      if (route.data.feature === 'IndicadoresAprobacionesRiesgoPersona' && vm.indicadoresAprobacionesRiesgoPersona === false) {
        return false;
      }
    }

    return true;
  }
}
