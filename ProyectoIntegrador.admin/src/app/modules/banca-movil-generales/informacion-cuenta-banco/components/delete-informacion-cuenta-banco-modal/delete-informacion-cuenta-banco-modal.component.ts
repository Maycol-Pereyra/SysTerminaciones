import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { InformacionCuentaBancoService } from '../../shared/informacion-cuenta-banco.service';

@Component({
  selector: 'app-delete-informacion-cuenta-banco-modal',
  templateUrl: './delete-informacion-cuenta-banco-modal.component.html',
  styleUrls: ['./delete-informacion-cuenta-banco-modal.component.scss']
})
export class DeleteInformacionCuentaBancoModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private services: InformacionCuentaBancoService, public modal: NgbActiveModal) { }

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
