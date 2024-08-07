import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AppSignalrService {
  public clienteBloqueo$ = new BehaviorSubject<any>(null);
  public clienteCambioEstado$ = new BehaviorSubject<any>(null);
  public clienteNuevo$ = new BehaviorSubject<any>(null);
  public clienteSolicitudAcceso$ = new BehaviorSubject<any>(null);
  public clienteSolicitudAccesoCambio$ = new BehaviorSubject<any>(null);
  public sesion$ = new BehaviorSubject<any>(null);
  public solicitudTransferencia$ = new BehaviorSubject<any>(null);
  public solicitudTransaccionMultiple$ = new BehaviorSubject<any>(null);
  public transferencia$ = new BehaviorSubject<any>(null);
  public pagoPrestamo$ = new BehaviorSubject<any>(null);
  public pagoServicio$ = new BehaviorSubject<any>(null);
  public solicitudIntegrarIndicadores$ = new Subject<any>();
  public solicitudProcesoIndicadores$ = new Subject<any>();
  public solicitudProcesoMacheoDatos$ = new Subject<any>();

  private hubConnection: signalR.HubConnection;

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${AppConfig.settings.api}/api/notificacion-hub`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  };

  public stopConnection = () => {
    this.hubConnection.stop()
      .then(() => console.log('Connection stop'))
      .catch(err => console.log('Error while stoping connection: ' + err));
  };


  public addClienteBloqueoDataListener = () => {
    this.hubConnection.on('ClienteBloqueo', (data) => {
      this.clienteBloqueo$.next(data);
    });
  };

  public addClienteCambioEstadoDataListener = () => {
    this.hubConnection.on('ClienteCambioEstado', (data) => {
      this.clienteCambioEstado$.next(data);
    });
  };

  public addClienteNuevoDataListener = () => {
    this.hubConnection.on('ClienteNuevo', (data) => {
      this.clienteNuevo$.next(data);
    });
  };

  public addClienteSolicitudAccesoDataListener = () => {
    this.hubConnection.on('ClienteSolicitudAcceso', (data) => {
      this.clienteSolicitudAcceso$.next(data);
    });
  };

  public addClienteSolicitudAccesoCambioDataListener = () => {
    this.hubConnection.on('ClienteSolicitudAccesoCambio', (data) => {
      this.clienteSolicitudAccesoCambio$.next(data);
    });
  };

  public addSesionDataListener = () => {
    this.hubConnection.on('Sesion', (data) => {
      this.sesion$.next(data);
    });
  };

  public addSolicitudTransferenciaDataListener = () => {
    this.hubConnection.on('SolicitudTransferencia', (data) => {
      this.solicitudTransferencia$.next(data);
    });
  };

  public addSolicitudTransaccionMultipleDataListener = () => {
    this.hubConnection.on('SolicitudTransaccionMultiple', (data) => {
      this.solicitudTransaccionMultiple$.next(data);
    });
  };

  public addTransferenciaDataListener = () => {
    this.hubConnection.on('Transferencia', (data) => {
      this.transferencia$.next(data);
    });
  };

  public addPagoPrestamoDataListener = () => {
    this.hubConnection.on('PagoPrestamo', (data) => {
      this.pagoPrestamo$.next(data);
    });
  };

  public addPagoServicioDataListener = () => {
    this.hubConnection.on('PagoServicio', (data) => {
      this.pagoServicio$.next(data);
    });
  };

  public addSolicitudIntegrarIndicadoresDataListener = () => {
    this.hubConnection.on('SolicitudIntegrarIndicadores', (data) => {
      this.solicitudIntegrarIndicadores$.next(data);
    });
  };

  public addSolicitudProcesoIndicadoresDataListener = () => {
    this.hubConnection.on('SolicitudProcesoIndicadores', (data) => {
      this.solicitudProcesoIndicadores$.next(data);
    });
  };

  public addSolicitudProcesoMacheoDatosDataListener = () => {
    this.hubConnection.on('SolicitudProcesoMacheoDatos', (data) => {
      this.solicitudProcesoMacheoDatos$.next(data);
    });
  };
}
