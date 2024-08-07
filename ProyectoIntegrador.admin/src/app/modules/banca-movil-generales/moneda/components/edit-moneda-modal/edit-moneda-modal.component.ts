import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { Moneda } from '../../shared/moneda.model';
import { MonedaService } from '../../shared/moneda.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-edit-moneda-modal',
  templateUrl: './edit-moneda-modal.component.html',
  styleUrls: ['./edit-moneda-modal.component.scss'],
})
export class EditMonedaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: Moneda;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: MonedaService,
    private fb: FormBuilder,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadData() {
    if (!this.id || this.id === 0) {
      this.vm = this.getEmty();
      this.loadForm();
    } else {
      const sb = this.service.getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.getEmty());
        })
      ).subscribe(item => {
        this.vm = item as Moneda;
        this.loadForm();
      });

      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre: [this.vm.nombre, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      simbolo: [this.vm.simbolo, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])],
      tasaCompra: [this.vm.tasaCompra, Validators.compose([Validators.min(0), Validators.max(99999999.99)])],
      tasaVenta: [this.vm.tasaVenta, Validators.compose([Validators.min(0), Validators.max(99999999.99)])],
    });
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    const sbUpdate = this.service
      .update(this.vm)
      .subscribe(res => {
        if (res && res.id) {
          this.mensajeOk('El registro fue realizado correctamente.');
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sbUpdate);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.nombre = formData.nombre;
    this.vm.simbolo = formData.simbolo;
    this.vm.tasaCompra = formData.tasaCompra;
    this.vm.tasaVenta = formData.tasaVenta;
  }

  private getEmty(): Moneda{
    return new Moneda(null);
 }
}
