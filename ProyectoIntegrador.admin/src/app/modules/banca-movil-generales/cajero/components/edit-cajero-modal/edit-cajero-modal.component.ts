import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { Cajero } from '../../shared/cajero.model';
import { CajeroService } from '../../shared/cajero.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-edit-cajero-modal',
  templateUrl: './edit-cajero-modal.component.html',
  styleUrls: ['./edit-cajero-modal.component.scss'],
})
export class EditCajeroModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: Cajero;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: CajeroService,
    private fb: FormBuilder,
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
        this.vm = item as Cajero;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombreEstablecimiento: [
        this.vm.nombreEstablecimiento,
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])
      ],
      direccion: [this.vm.direccion, Validators.compose([Validators.required, Validators.maxLength(100)])],
      ciudad: [this.vm.ciudad, Validators.compose([Validators.required, Validators.maxLength(100)])],
      geolocalizacion: [this.vm.geolocalizacion, Validators.compose([Validators.maxLength(100)])],
    });
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    const sbUpdate = this.service
      .update(this.vm)
      .subscribe((res: any) => {
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
    this.vm.nombreEstablecimiento = formData.nombreEstablecimiento;
    this.vm.direccion = formData.direccion;
    this.vm.ciudad = formData.ciudad;
    this.vm.geolocalizacion = formData.geolocalizacion;
  }

  private getEmty(): Cajero{
    return new Cajero(null);
  }
}
