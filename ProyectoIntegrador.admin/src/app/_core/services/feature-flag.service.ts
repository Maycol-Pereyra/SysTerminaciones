import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceHelper } from '../helpers/service.helper';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  financVersionId = 0;

  get bancaMovil$(): Observable<boolean> {
    return this.bancaMovilSubject.asObservable();
  }

  get solicitudPrestamos$(): Observable<boolean> {
    return this.solicitudPrestamosSubject.asObservable();
  }

  get prospeccion$(): Observable<boolean> {
    return this.prospeccionSubject.asObservable();
  }

  get gestionCredito$(): Observable<boolean> {
    return this.gestionCreditoSubject.asObservable();
  }

  get gestionCreditoAnalisisCredito$(): Observable<boolean> {
    return this.gestionCreditoAnalisisCreditoSubject.asObservable();
  }

  get gestionCreditoAnalisisAprobacion$(): Observable<boolean> {
    return this.gestionCreditoAnalisisAprobacionSubject.asObservable();
  }

  get indicadoresAprobaciones$(): Observable<boolean> {
    return this.indicadoresAprobacionesSubject.asObservable();
  }

  get indicadoresAprobacionesCarreraSueldo$(): Observable<boolean> {
    return this.indicadoresAprobacionesCarreraSueldoSubject.asObservable();
  }

  get indicadoresAprobacionesRiesgoPersona$(): Observable<boolean> {
    return this.indicadoresAprobacionesRiesgoPersonaSubject.asObservable();
  }

  get generalesConsumoListaInteres$(): Observable<boolean> {
    return this.generalesConsumoListaInteresSubject.asObservable();
  }

  get vm(): any {
    return this.data;
  }

  private bancaMovilSubject = new BehaviorSubject<boolean>(false);
  private solicitudPrestamosSubject = new BehaviorSubject<boolean>(false);
  private prospeccionSubject = new BehaviorSubject<boolean>(false);
  private gestionCreditoSubject = new BehaviorSubject<boolean>(false);
  private gestionCreditoAnalisisCreditoSubject = new BehaviorSubject<boolean>(false);
  private gestionCreditoAnalisisAprobacionSubject = new BehaviorSubject<boolean>(false);
  private indicadoresAprobacionesSubject = new BehaviorSubject<boolean>(false);
  private indicadoresAprobacionesCarreraSueldoSubject = new BehaviorSubject<boolean>(false);
  private indicadoresAprobacionesRiesgoPersonaSubject = new BehaviorSubject<boolean>(false);
  private generalesConsumoListaInteresSubject = new BehaviorSubject<boolean>(false);

  private urlBase;
  private data: any;

  constructor(
    private http: HttpClient,
  ) {
    this.urlBase = `${AppConfig.settings.api}/api/generales/admin/feature-flag`;
  }

  getFeatureFlag(): Observable<any> {
    const headers = ServiceHelper.obtenerHttpHeader();

    const url = `${this.urlBase}`;

    return this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => {
          this.data = data;
          this.bancaMovilSubject.next(this.data.bancaMovil);
          this.solicitudPrestamosSubject.next(this.data.solicitudPrestamos);
          this.prospeccionSubject.next(this.data.prospeccion);
          this.gestionCreditoSubject.next(this.data.gestionCredito);
          this.indicadoresAprobacionesSubject.next(this.data.indicadoresAprobaciones);
          this.gestionCreditoAnalisisCreditoSubject.next(this.data.gestionCreditoAnalisisCredito);
          this.gestionCreditoAnalisisAprobacionSubject.next(this.data.gestionCreditoAnalisisAprobacion);
          this.indicadoresAprobacionesCarreraSueldoSubject.next(this.data.indicadoresAprobacionesCarreraSueldo);
          this.indicadoresAprobacionesRiesgoPersonaSubject.next(this.data.indicadoresAprobacionesRiesgoPersona);
          this.generalesConsumoListaInteresSubject.next(this.data.generalesConsumoListaInteres);
          this.financVersionId = data.financVersionId;
          return data;
        })
      );
  }
}
