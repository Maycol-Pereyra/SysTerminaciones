import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Injectable()
export class ToastService {
  style = 'material';
  timeout = 8000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  constructor(private snotifyService: SnotifyService) { }


  getConfig(): SnotifyToastConfig {

    this.snotifyService.setDefaults({
        global: {
            newOnTop: this.newTop,
            maxAtPosition: this.blockMax,
            maxOnScreen: this.dockMax,
        }
    });

    return {
        bodyMaxLength: this.bodyMaxLength,
        titleMaxLength: this.titleMaxLength,
        backdrop: this.backdrop,
        position: this.position,
        timeout: this.timeout,
        showProgressBar: this.progressBar,
        closeOnClick: this.closeClick,
        pauseOnHover: this.pauseHover
    };
  }

  onSuccess(mensaje: string, titulo: string = '') {
      this.snotifyService.success(mensaje, titulo, this.getConfig());
  }

  onInfo(mensaje: string, titulo: string = '') {
      this.snotifyService.info(mensaje, titulo, this.getConfig());
  }

  onError(mensaje: string, titulo: string = '') {
      this.snotifyService.error(mensaje, titulo, this.getConfig());
  }

  onWarning(mensaje: string, titulo: string = '') {
      this.snotifyService.warning(mensaje, titulo, this.getConfig());
  }
}
