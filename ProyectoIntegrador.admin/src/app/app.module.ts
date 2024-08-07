/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { JwtInterceptor } from './_core/interceptors/jwt-interceptor';
import { ErrorInterceptor } from './_core/interceptors/error.interceptor';
import { AppAuthGuard } from './_core/guards/app-auth.guard';
import { UserService } from './_core/services/app-user.service';
import { AccesosService } from './_core/services/acceso.service';
import { AuthenticationService } from './_core/services/authentication.service';
import { ToastService } from './_core/services/toast.service';
import { SnotifyModule, ToastDefaults, SnotifyService } from 'ng-snotify';
import { AppConfig } from './_core/services/app-config.service';
import { ApplicationInsightsMonitoringService } from './_core/services/application-insights-monitoring.service';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CanDeactivateGuard } from './_core/guards/can-desactivate.guard';
import { NgSelectModule } from '@ng-select/ng-select';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = { dropSpecialCharacters: false};

export function advAppInit(appConfigService: AppConfig) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgSelectModule,
    SnotifyModule.forRoot(),
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: advAppInit,
      multi: true,
      deps: [AppConfig]
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AppAuthGuard,
    CanDeactivateGuard,
    UserService,
    AccesosService,
    AuthenticationService,
    ToastService,
    ApplicationInsightsMonitoringService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          json: () => import('highlight.js/lib/languages/json')
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
