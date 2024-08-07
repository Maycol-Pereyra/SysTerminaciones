import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { SucursalContacto } from '../../shared/sucursal-contacto.model';
import { SucursalContactoService } from '../../shared/sucursal-contacto.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { regexCorreo } from 'src/app/_core/const/regexp.const';

@Component({
  selector: 'app-edit-sucursal-contacto-modal',
  templateUrl: './edit-sucursal-contacto-modal.component.html',
  styleUrls: ['./edit-sucursal-contacto-modal.component.scss'],
})
export class EditSucursalContactoModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  sucursal$;

  vm: SucursalContacto;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: SucursalContactoService,
    private fb: FormBuilder,
    private itemSelectService: ItemSelectService,
    private accesosService: AccesosService,
    public modal: NgbActiveModal
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.sucursal$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.bancaMovilSucursalItemSelect}`);
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
      ).subscribe((item: SucursalContacto) => {
        this.vm = item;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      sucursalId: [this.vm.sucursalId, Validators.compose([Validators.required])],
      nombre: [this.vm.nombre, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      departamento: [this.vm.departamento, Validators.compose([Validators.required, Validators.maxLength(100)])],
      telefono: [this.vm.telefono, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])],
      correo: [this.vm.correo, Validators.compose([Validators.email, Validators.pattern(regexCorreo), Validators.maxLength(100)])],
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private getEmty(): SucursalContacto{
    return new SucursalContacto(null);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.sucursalId = formData.sucursalId;
    this.vm.nombre = formData.nombre;
    this.vm.departamento = formData.departamento;
    this.vm.telefono = formData.telefono;
    this.vm.correo = formData.correo;
  }
}
