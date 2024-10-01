/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`,
                    'x-client-name': 'sys-terminaciones-admin',
                    'x-client-version': `${environment.appVersion}`,
                    'x-client-device': `${this.detectBrowserName()}`,
                    'x-client-os-version': `${this.detectBrowserVersion()}`
                }
            });
        } else {
            request = request.clone({
              setHeaders: {
                'x-client-name': 'sys-terminaciones-admin',
                'x-client-version': `${environment.appVersion}`,
                'x-client-device': `${this.detectBrowserName()}`,
                'x-client-os-version': `${this.detectBrowserVersion()}`
              }
            });
          }

        return next.handle(request);
    }

    private detectBrowserName() {
        const agent = window.navigator.userAgent.toLowerCase();

        switch (true) {
        case agent.indexOf('edge') > -1:
            return 'edge';
        case agent.indexOf('edg') > -1:
            return 'edge';
        case agent.indexOf('opr') > -1 && !!(window as any).opr:
            return 'opera';
        case agent.indexOf('chrome') > -1 && !!(window as any).chrome:
            return 'chrome';
        case agent.indexOf('trident') > -1:
            return 'ie';
        case agent.indexOf('firefox') > -1:
            return 'firefox';
        case agent.indexOf('safari') > -1:
            return 'safari';
        default:
            return 'other';
        }
    }

    private detectBrowserVersion() {
        const userAgent = navigator.userAgent;
        let tem;
        let matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|edge|edg|trident(?=\/))\/?\s*(\d+)/i) || [];

        if(/trident/i.test(matchTest[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            return 'IE '+(tem[1] || '');
        }

        if(matchTest[1] === 'Chrome') {
            tem = userAgent.match(/\b(OPR|Edge|Edg)\/(\d+)/);
            if(tem !== null) {
                return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
        }

        matchTest = matchTest[2] ? [matchTest[1], matchTest[2]]: [navigator.appName || '?', navigator.appVersion || '?', '-?'];

        if((tem= userAgent.match(/version\/(\d+)/i)) !== null) {
            matchTest.splice(1, 1, tem[1]);
        }

        return matchTest.join(' ');
    }
}
