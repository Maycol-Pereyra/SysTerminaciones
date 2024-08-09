import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { SectorService } from '../../shared/sector.service';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { Sector } from '../../shared/sector.model';

@Component({
  selector: 'app-edit-sector-modal',
  templateUrl: './edit-sector-modal.component.html',
})
export class EditSectorModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: Sector;
  ciudades$;

  public listaSolicitud: ItemSelect[] = [];
  public listaTipoProducto: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: SectorService,
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

    this.ciudades$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.ciudad}`);

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
        this.vm = item as Sector;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      descripcion: [
        this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      ciudadId: [this.vm.ciudadId, Validators.compose([Validators.required])],
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
    if (this.accesosService.puedeActivar('generales.sector.activar')) {

      this.confirmacion(`¿Está seguro de activar el sector?`, 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk(`Se ha activado el sector`);
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
    if (this.accesosService.puedeInactivar('generales.sector.inactivar')) {

      this.confirmacion(`¿Está seguro de inactivar el sector?`, 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk(`Se ha inactivado el sector`);
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
    this.vm.ciudadId = formData.ciudadId;
  }

  private getEmty(): Sector{
    return new Sector(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    return true;
  }

}
