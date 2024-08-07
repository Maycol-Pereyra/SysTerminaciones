import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

export interface IAppConfig {
  api: string;
  logoImpresion01: string;
  logoImpresionSize01: string;
  appInsightsInstrumentationKey: string;
  appInsightsEnableAutoRouteTracking: boolean;
  appInsightsRoleName: string;
  appInsightsRoleInstance: string;
  solicitudUrl: string;
}

@Injectable()
export class AppConfig {
  static settings: IAppConfig;

  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  load() {
  	const archivo = '/assets/data/app.config.json';
	  return new Promise<void>((resolve, reject) => {
		  this.http
        .get(archivo)
        .toPromise()
        .then((response: any) => {
          AppConfig.settings = response as IAppConfig;
          resolve();
        }).catch((response: any) => {
            reject(`No se pudo leer el archivo ${archivo}: ${JSON.stringify(response)}`);
        });
	  });
  }
}
