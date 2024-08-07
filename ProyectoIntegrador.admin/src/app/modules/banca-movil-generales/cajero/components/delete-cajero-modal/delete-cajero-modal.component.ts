import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { CajeroService } from '../../shared/cajero.service';

@Component({
  selector: 'app-delete-cajero-modal',
  templateUrl: './delete-cajero-modal.component.html',
  styleUrls: ['./delete-cajero-modal.component.scss']
})
export class DeleteCajeroModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private services: CajeroService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  delete() {
    this.isLoading = true;

    const sb = this.services
      .delete(this.id)
      .pipe(
        delay(1000), // Remove it from your code (just for showing loading)
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
