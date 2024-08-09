import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { Provincia } from '../../shared/provincia.model';
import { ProvinciaService } from '../../shared/provincia.service';

@Component({
  selector: 'app-edit-provincia-modal',
  templateUrl: './edit-provincia-modal.component.html',
})
export class EditProvinciaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: Provincia;
  paises$;

  public listaSolicitud: ItemSelect[] = [];
  public listaTipoProducto: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: ProvinciaService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    private itemSelectService: ItemSelectService
    ) {
    super();
  }

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.paises$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.pais}`);

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
        this.vm = item as Provincia;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [
        this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      paisId: [this.vm.paisId, Validators.compose([Validators.required])],
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

  actualizarDescripcion(id: number) {
    const value = this.listaSolicitud.find(o => o.id === id);

    if (value) {
      return value.descripcion;
    }
  }

  activar(): void {
    if (this.accesosService.puedeActivar('generales.provincia.activar')) {

      this.confirmacion(`¿Está seguro de activar la provincia?`, 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk(`Se ha activado la provincia`);
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
    if (this.accesosService.puedeInactivar('generales.provincia.inactivar')) {

      this.confirmacion(`¿Está seguro de inactivar la provincia?`, 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk(`Se ha inactivado la provincia`);
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
    this.vm.paisId = formData.paisId;
  }

  private getEmty(): Provincia{
    return new Provincia(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    return true;
  }

}
