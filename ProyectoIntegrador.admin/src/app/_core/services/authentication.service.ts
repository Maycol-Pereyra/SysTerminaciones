import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AccesosService } from './acceso.service';
import { ServiceHelper } from '../helpers/service.helper';
import { AppConfig } from './app-config.service';
import { Mensajes } from '../helpers/mensaje.helper';
import { ApplicationInsightsMonitoringService } from './application-insights-monitoring.service';
import { AppGlobalService } from './app-global.service';

@Injectable()
export class AuthenticationService {
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;
  public isLoading$: Observable<boolean>;
  public isLoadingSubject: BehaviorSubject<boolean>;

  private urlBase: string;
  private storage = sessionStorage;

  constructor(
    private http: HttpClient,
    private accesoService: AccesosService,
    private appGlobalService: AppGlobalService,
    private applicationInsightsMonitoringService: ApplicationInsightsMonitoringService
  ) {
    this.urlBase = `${AppConfig.settings.api}/api/usuario`;
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    const user = JSON.parse(this.storage.getItem('currentUser'));
    if (user) {
      const x = new User(
        user.id || 0,
        user.nombre || '',
        user.apellido || '',
        user.estaActivo === undefined ? false : user.estaActivo,
        user.login || '',
        '',
        user.token || ''
      );
      this.currentUserSubject = new BehaviorSubject<User>(x);
      this.applicationInsightsMonitoringService.setUserId(user.login);
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getAcceso(id: number) {
    const headers = ServiceHelper.obtenerHttpHeader();
    const url = `${this.urlBase}/${id}/acceso`;
    this.isLoadingSubject.next(true);
    return this.http
      .get(url, { headers })
      .pipe(
        map((response: any) => {
          this.accesoService.setListaAcceso(response);
          return response;
        }),
        catchError(error => ServiceHelper.handleError(error)),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  login(login: string, password: string) {
    const url = `${this.urlBase}/authenticate`;
    this.isLoadingSubject.next(true);
    return this.http.post<User>(url, { login, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {

            const x = new User(
              user.id || 0,
              user.nombre || '',
              user.apellido || '',
              user.estaActivo === undefined ? false : user.estaActivo,
              user.login || '',
              '',
              user.token || ''
            );

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.storage.setItem('currentUser', JSON.stringify(x));
            this.currentUserSubject.next(x);

            this.applicationInsightsMonitoringService.setUserId(user.login);
          }

          return user;
        }),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  solicitarPassword(login: string): Observable<any> {
    const url = `${this.urlBase}/solicita-password`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, { login })
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          // this._errorMessage.next(msg);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  olvideContrasena(login: string): Observable<any> {
    const url = `${this.urlBase}/olvide-contrasena`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, { login })
      .pipe(
        map((response: any) => ({id: response.codigoSeguridadId, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  reenviaCodigoSeguridadId(login: string, codigoSeguridadId: string): Observable<any> {
    const url = `${this.urlBase}/codigo-seguridad-reenvio`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, { login, codigoSeguridadId })
      .pipe(
        map((response: any) => ({id: response.codigoSeguridadId, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  validaCodigoSeguridad(login: string, codigoSeguridadId: string, codigoSeguridad: string): Observable<any> {
    const url = `${this.urlBase}/codigo-seguridad-valida`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, { login, codigoSeguridadId, codigoSeguridad })
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  olvideContrasenaActualiza(login: string, codigoSeguridadId: string, codigoSeguridad: string, password: string): Observable<any> {
    const url = `${this.urlBase}/olvide-contrasena-actualiza`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, { login, codigoSeguridadId, codigoSeguridad, password })
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  cambiarPassword(passwordViejo: string, passwordNuevo: string): Observable<any> {
    const url = `${this.urlBase}/cambio-password`;
    this.isLoadingSubject.next(true);

    return this.http.post<any>(url, { passwordViejo, passwordNuevo })
      .pipe(
        map((response: any) => ({ id: 1, msg: '' })),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  activar(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}/activar`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, '')
      .pipe(
        map((response: any) => ({ id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          // this._errorMessage.next(msg);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  inactivar(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}/inactivar`;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(url, '')
      .pipe(
        map((response: any) => ({id: 1, msg: ''})),
        catchError(err => {
          const msg  = Mensajes.mensajeError(err);
          // this._errorMessage.next(msg);
          return of({ id: undefined, msg });
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  logout() {
    this.appGlobalService.setEnProcesoLogout(true);
    this.applicationInsightsMonitoringService.clearUserId();
    this.isLoadingSubject.next(true);
    // remove user from local storage to log user out
    this.storage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoadingSubject.next(false);
  }
}
