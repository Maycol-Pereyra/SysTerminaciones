import { ErrorHandler, Injectable } from '@angular/core';
import { ApplicationInsightsMonitoringService } from './application-insights-monitoring.service';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    constructor(private applicationInsightsMonitoringService: ApplicationInsightsMonitoringService) {
        super();
    }

    handleError(error: Error) {
        this.logOriginalError(error);
    }

    private logOriginalError(error: any) {
        while (error) {
          this.applicationInsightsMonitoringService.logException(error);
          error = error.originalError;
        }

        return error;
    }
}
