import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { Unidad } from '../../shared/unidad.model';
import { UnidadService } from '../../shared/unidad.service';

@Component({
  selector: 'app-edit-unidad-modal',
  templateUrl: './edit-unidad-modal.component.html',
})
export class EditUnidadModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: Unidad;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: UnidadService,
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
        this.vm = item as Unidad;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [
        this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      abreviatura: [
          this.vm.abreviatura, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])],
      cantidad: [this.vm.cantidad, Validators.compose([Validators.min(0), Validators.max(99999999.99)])],
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
    if (this.accesosService.puedeActivar('generales.unidad.activar')) {

      this.confirmacion(`¿Está seguro de activar la unidad?`, 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk(`Se ha activado la unidad`);
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
    if (this.accesosService.puedeInactivar('generales.unidad.inactivar')) {

      this.confirmacion(`¿Está seguro de inactivar la unidad?`, 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk(`Se ha inactivado la unidad`);
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
    this.vm.abreviatura = formData.abreviatura;
    this.vm.cantidad = formData.cantidad;
  }

  private getEmty(): Unidad{
    return new Unidad(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    return true;
  }

}
