import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { Registro } from '../../shared/registro.model';
import { RegistroService } from '../../shared/registro.service';

@Component({
  selector: 'app-edit-registro-modal',
  templateUrl: './edit-registro-modal.component.html',
})
export class EditRegistroModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() tipoRegistroId: number;
  @Input() titulo: string;
  @Input() accesoActivarId: string;
  @Input() accesoInactivarId: string;

  isLoading$;
  vm: Registro;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: RegistroService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
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
        this.vm = item as Registro;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [
        this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
    });
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    if (!this.validar()) { return; }

    const sbUpdate = this.service.update(this.vm)
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  activar(): void {
    if (this.accesosService.puedeActivar(`${this.accesoActivarId}`)) {

      this.confirmacion(`¿Está seguro de activar el registro?`, 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk(`El registro ha sido activado`);
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
        this.subscriptions.push(sb);
      });
    }
  }

  inactivar(): void {
    if (this.accesosService.puedeInactivar(`${this.accesoInactivarId}`)) {

      this.confirmacion(`¿Está seguro de inactivar el registro?`, 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk(`El registro ha sido inactivado`);
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.descripcion = formData.descripcion;
    this.vm.tipoRegistroId = this.tipoRegistroId;
  }

  private getEmty(): Registro{
    return new Registro(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    return true;
  }

}
