import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { TipoPagoService } from '../../shared/tipo-pago.service';

@Component({
  selector: 'app-delete-tipo-pago-modal',
  templateUrl: './delete-tipo-pago-modal.component.html',
  styleUrls: ['./delete-tipo-pago-modal.component.scss']
})
export class DeleteTipoPagoModalComponent implements OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private services: TipoPagoService, public modal: NgbActiveModal) { }

  delete() {
    this.isLoading = true;

    const sb = this.services
      .delete(this.id)
      .pipe(
        delay(1000),
        tap(() => this.modal.close()),
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
