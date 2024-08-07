import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { TipoServicioReclamacion } from '../../shared/tipo-servicio-reclamacion.model';
import { TipoServicioReclamacionService } from '../../shared/tipo-servicio-reclamacion.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { regexCorreo } from 'src/app/_core/const/regexp.const';
import { StringHelper } from 'src/app/_core/helpers/string.helper';
import { TipoServicioReclamacionEnum } from '../../shared/tipo-servicio-reclamacion.enum';

@Component({
  selector: 'app-edit-tipo-servicio-reclamacion-modal',
  templateUrl: './edit-tipo-servicio-reclamacion-modal.component.html',
})
export class EditTipoServicioReclamacionModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: TipoServicioReclamacion;

  public listaSolicitud: ItemSelect[] = [];
  public listaTipoProducto: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: TipoServicioReclamacionService,
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
    this.llenarListaSolicitud();
    this.llenarListaTipoProducto();
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
        this.vm = item as TipoServicioReclamacion;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      tipoSolicitudId: [this.vm.tipoSolicitudId, Validators.compose([ Validators.required])],
      debeEspecificarProducto: [this.vm.debeEspecificarProducto, Validators.compose([Validators.nullValidator])],
      tipoProductoSolicitudId: [this.vm.tipoProductoSolicitudId, Validators.compose([Validators.nullValidator])],
      descripcion: [
        this.vm.descripcion, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(250)])],
      descripcionLarga: [
        this.vm.descripcionLarga, Validators.compose([Validators.minLength(1), Validators.maxLength(500)])],
      enviarCorreoOficialNegocioCliente: [this.vm.enviarCorreoOficialNegocioCliente, Validators.compose([Validators.nullValidator])],
      enviarCorreoConfigurado: [this.vm.enviarCorreoConfigurado, Validators.compose([Validators.nullValidator])],
      correoConfigurado: [this.vm.correoConfigurado, Validators.compose([Validators.nullValidator])],
      permiteAdjuntarArchivo: [this.vm.permiteAdjuntarArchivo, Validators.compose([Validators.nullValidator])],
      esObligatorioAdjuntarArchivo: [this.vm.esObligatorioAdjuntarArchivo, Validators.compose([Validators.nullValidator])],
    });

    this.formGroup.controls.debeEspecificarProducto.valueChanges.subscribe(val => {
      this.actualizaTipoProductoSolicitudId(val);
    });

    this.formGroup.controls.enviarCorreoConfigurado.valueChanges.subscribe(val => {
      this.actualizaCorreoConfigurado(val);
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
    if (this.accesosService.puedeActivar('banca-movil.tipo-servicio-reclamacion.activar')) {

      const tipoSolicitudDescripcion = this.vm.tipoSolicitudId === TipoServicioReclamacionEnum.Servicio
        ? 'servicio'
        : 'reclamación';

      this.confirmacion(`¿Está seguro de activar el tipo de ${tipoSolicitudDescripcion}?`, 'Confirmación', () => {
        const sb = this.service.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk(`Se ha activado el tipo de ${tipoSolicitudDescripcion}`);
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
    if (this.accesosService.puedeInactivar('banca-movil.tipo-servicio-reclamacion.inactivar')) {

      const tipoSolicitudDescripcion = this.vm.tipoSolicitudId === TipoServicioReclamacionEnum.Servicio
        ? 'servicio'
        : 'reclamación';

      this.confirmacion(`¿Está seguro de inactivar el tipo de ${tipoSolicitudDescripcion}?`, 'Confirmación', () => {
        const sb = this.service
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk(`Se ha inactivado el tipo de ${tipoSolicitudDescripcion}`);
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  private llenarListaSolicitud(): void {
    this.listaSolicitud.push(new ItemSelect({ id: 1 , descripcion: 'Servicio' }));
    this.listaSolicitud.push(new ItemSelect({ id: 2, descripcion: 'Reclamación' }));
  }

  private llenarListaTipoProducto(): void {
    this.listaTipoProducto.push(new ItemSelect({ id: 1 , descripcion: 'Cuenta de Ahorros' }));
    this.listaTipoProducto.push(new ItemSelect({ id: 2, descripcion: 'Cuenta de Aportaciones' }));
    this.listaTipoProducto.push(new ItemSelect({ id: 3, descripcion: 'Préstamo' }));
    this.listaTipoProducto.push(new ItemSelect({ id: 4, descripcion: 'Certificado' }));
  }

  private actualizaTipoProductoSolicitudId(value: boolean): void {
    const campoTipoProductoSolicitudId = this.formGroup.get('tipoProductoSolicitudId') as FormControl;

    if (value) {
      campoTipoProductoSolicitudId.setValidators([Validators.required,]);
    } else {
      campoTipoProductoSolicitudId.setValidators([Validators.nullValidator,]);
    }

    campoTipoProductoSolicitudId.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private actualizaCorreoConfigurado(value: boolean): void {
    const campoCorreoConfigurado = this.formGroup.get('correoConfigurado') as FormControl;

    if (value) {
      campoCorreoConfigurado.setValidators([Validators.required,Validators.email,
        Validators.pattern(regexCorreo), Validators.maxLength(100)]);
    } else {
      campoCorreoConfigurado.setValidators([Validators.nullValidator,]);
    }

    campoCorreoConfigurado.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.tipoSolicitudId = +formData.tipoSolicitudId;
    this.vm.debeEspecificarProducto = formData.debeEspecificarProducto;
    this.vm.tipoProductoSolicitudId = +formData.tipoProductoSolicitudId > 0 ? +formData.tipoProductoSolicitudId : null;
    this.vm.descripcion = formData.descripcion;
    this.vm.descripcionLarga = formData.descripcionLarga;
    this.vm.enviarCorreoOficialNegocioCliente = formData.enviarCorreoOficialNegocioCliente;
    this.vm.enviarCorreoConfigurado = formData.enviarCorreoConfigurado;
    this.vm.correoConfigurado = formData.correoConfigurado;
    this.vm.permiteAdjuntarArchivo = formData.permiteAdjuntarArchivo;
    this.vm.esObligatorioAdjuntarArchivo = formData.esObligatorioAdjuntarArchivo;

    if (this.vm.debeEspecificarProducto === false) {
      this.vm.tipoProductoSolicitudId = null;
    }

    if (this.vm.enviarCorreoConfigurado === false) {
      this.vm.correoConfigurado = '';
    }
  }

  private getEmty(): TipoServicioReclamacion{
    return new TipoServicioReclamacion(null);
  }

  private validar(): boolean {
    if (StringHelper.obtenerValorString(this.vm.descripcion) === '') {
      this.mensajeValidacion('Debe especificar la descripción');
      return false;
    }

    return true;
  }

}
