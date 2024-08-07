import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { TipoCertificacionService } from '../../shared/tipo-certificacion.service';

@Component({
  selector: 'app-delete-tipo-certificacion-modal',
  templateUrl: './delete-tipo-certificacion-modal.component.html'
})
export class DeleteTipoCertificacionModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private service: TipoCertificacionService, public modal: NgbActiveModal) { }

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
