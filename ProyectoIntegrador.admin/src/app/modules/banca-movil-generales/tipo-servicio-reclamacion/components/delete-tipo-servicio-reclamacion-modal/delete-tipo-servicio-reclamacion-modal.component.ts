import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { TipoServicioReclamacionService } from '../../shared/tipo-servicio-reclamacion.service';

@Component({
  selector: 'app-delete-tipo-servicio-reclamacion-modal',
  templateUrl: './delete-tipo-servicio-reclamacion-modal.component.html'
})
export class DeleteTipoServicioReclamacionModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private service: TipoServicioReclamacionService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  delete() {
    this.isLoading = true;

    const sb = this.service
      .delete(this.id)
      .pipe(
        delay(1000),
        tap((data: any) => {
          if (data.msg) {
            this.modal.dismiss(data.msg);
          } else {
            this.modal.close();
          }
        }),
        catchError((err) => {
          this.modal.dismiss(err);
          return of(undefined);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();

    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
