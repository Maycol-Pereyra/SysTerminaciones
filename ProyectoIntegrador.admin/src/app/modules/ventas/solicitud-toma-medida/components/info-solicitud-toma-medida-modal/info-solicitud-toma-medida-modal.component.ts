import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { SolicitudTomaMedida } from '../../shared/solicitud-toma-medida.model';
import { SolicitudTomaMedidaService } from '../../shared/solicitud-toma-medida.service';

@Component({
  selector: 'app-info-solicitud-toma-medida-modal',
  templateUrl: './info-solicitud-toma-medida-modal.component.html',
})
export class InfoSolicitudTomaMedidaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: SolicitudTomaMedida;

  public listaTipoMedida: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: SolicitudTomaMedidaService,
    public modal: NgbActiveModal
    ) {
    super();
  }

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.loadData();
  }

  loadData() {
    const sb = this.service.getItemById(this.id)
    .pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.getEmty());
      })
    ).subscribe(item => {
      this.vm = item as SolicitudTomaMedida;
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private getEmty(): SolicitudTomaMedida{
    return new SolicitudTomaMedida(null);
  }
}
