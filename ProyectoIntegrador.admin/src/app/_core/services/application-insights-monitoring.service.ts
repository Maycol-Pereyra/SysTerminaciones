import { Injectable } from '@angular/core';
import { ApplicationInsights, DistributedTracingModes } from '@microsoft/applicationinsights-web';
import { AppConfig } from './app-config.service';
import { StringHelper } from '../helpers/string.helper';

@Injectable()
export class ApplicationInsightsMonitoringService {
  appInsights: ApplicationInsights;

  private usaApplicationInsights = false;

  constructor() {
    if (AppConfig.settings.appInsightsInstrumentationKey) {
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: AppConfig.settings.appInsightsInstrumentationKey,
          enableAutoRouteTracking: AppConfig.settings.appInsightsEnableAutoRouteTracking, // option to log all route changes
          distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
          disableCorrelationHeaders: false,
          enableCorsCorrelation: true,
          disableAjaxTracking: false,
          autoTrackPageVisitTime: true
        }
      });

      this.appInsights.loadAppInsights();

      this.loadCustomTelemetryProperties();

      this.usaApplicationInsights = true;
    }
  }

  inicio(): void {
    // ESTA NO HACE NADA ES SOLO PARA QUITAR EL MENSAJE DE QUE EL SERVICIO NO SE USA EN EL app.component.ts
  }

  setUserId(userId: string) {
    if (!this.usaApplicationInsights) {
      return;
    }

    userId = StringHelper.sanearStringParaUrl(userId);
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    if (!this.usaApplicationInsights) {
      return;
    }

    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, url?: string) { // option to call manually
    if (!this.usaApplicationInsights) {
      return;
    }

    this.appInsights.trackPageView({ name, uri: url });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (!this.usaApplicationInsights) {
      return;
    }

    this.appInsights.trackEvent({ name }, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    if (!this.usaApplicationInsights) {
      return;
    }

    this.appInsights.trackMetric({ name, average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    if (!this.usaApplicationInsights) {
      return;
    }

    this.appInsights.trackException({ exception, severityLevel });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    if (!this.usaApplicationInsights) {
      return;
    }

    this.appInsights.trackTrace({ message }, properties);
  }

  private loadCustomTelemetryProperties()
  {
    this.appInsights.addTelemetryInitializer(envelope =>
      {
        const item = envelope.baseData;
        if (item) {
          item.properties = item.properties || {};
          // item.properties.ApplicationPlatform = 'WEB';
          // item.properties.ApplicationName = AppConfig.settings.appInsightsRoleName || 'advansys-gestion-credito-admin';
        }

        if (envelope !== undefined && envelope.tags) {
          envelope.tags['ai.cloud.role'] = AppConfig.settings.appInsightsRoleName || 'advansys-gestion-credito-admin';
          envelope.tags['ai.cloud.roleInstance'] = AppConfig.settings.appInsightsRoleInstance || 'advansys-gestion-credito-admin-01';
        }
      }
    );
  }
}
