import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ApplicationInsightsMonitoringService } from '../services/application-insights-monitoring.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private applicationInsightsMonitoringService: ApplicationInsightsMonitoringService
    // private state: RouterStateSnapshot
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authenticationService.logout();
          // location.reload(true);

          this.applicationInsightsMonitoringService.logTrace(`No está logueado o tiempo de sesión ha terminado. Status: ${err.status}`);

          console.log(`No está logueado o Tiempo de sesión ha terminado. Status: ${err.status}`);
          // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.state.url }});
          this.router.navigate(['/auth/login']);
        }

        // console.log('interceptor');
        // console.log(err);
        // const error = err.error.message || err.statusText;
        return throwError(err);
      }));
  }
}
