import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { ItemSelect } from '../../../../../_core/item-select/item-select.model';
import { TipoCertificacion } from '../../shared/tipo-certificacion.model';
import { TipoCertificacionService } from '../../shared/tipo-certificacion.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { StringHelper } from 'src/app/_core/helpers/string.helper';

@Component({
  selector: 'app-edit-tipo-certificacion-modal',
  templateUrl: './edit-tipo-certificacion-modal.component.html',
})
export class EditTipoCertificacionModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  tipoCertificacion$ = new BehaviorSubject<any[]>([]);
  vm: TipoCertificacion;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: TipoCertificacionService,
    private fb: FormBuilder,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    const sb = this.service.getItemSelectCore()
    .subscribe(items => {
      this.tipoCertificacion$.next(items);
    });

    this.subscriptions.push(sb);

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
        this.vm = item as TipoCertificacion;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      tipoCertificacionInternaId: [this.vm.tipoCertificacionInternaId, Validators.compose([Validators.required])],
      descripcion: [this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
      nota: [this.vm.nota, Validators.compose([Validators.minLength(1), Validators.maxLength(500)])],
      estaActivo: [this.vm.estaActivo, Validators.compose([Validators.required])],
      notaPieCertificacion: [this.vm.notaPieCertificacion, Validators.compose([Validators.maxLength(1024)])],
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
    if (this.accesosService.puedeActivar('banca-movil.tipo-certificacion.activar')) {
      this.confirmacion('¿Está seguro de activar el tipo de certificación?', 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('Se ha activado el tipo de certificación');
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
    if (this.accesosService.puedeInactivar('banca-movil.tipo-certificacion.inactivar')) {
      this.confirmacion('¿Está seguro de inactivar el tipo de certificación?', 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk('Se ha inactivado el tipo de certificación');
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  actualizarDescripcion(id: number) {
    const values = this.tipoCertificacion$.value;
    const value = values.find(o => o.id === id);

    if (value) {
      return value.descripcion;
    }
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.tipoCertificacionInternaId = formData.tipoCertificacionInternaId;
    this.vm.descripcion = formData.descripcion;
    this.vm.nota = formData.nota;
    this.vm.estaActivo = formData.estaActivo;
    this.vm.notaPieCertificacion = formData.notaPieCertificacion;
  }

  private getEmty(): TipoCertificacion{
    return new TipoCertificacion(null);
  }

  private validar(): boolean {
    if (this.vm.id <= 0 && (!this.vm.tipoCertificacionInternaId || this.vm.tipoCertificacionInternaId <=0)) {
      this.mensajeValidacion('Debe de seleccionar el tipo de certificación del core bancario');
      return false;
    }

    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    return true;
  }

}
