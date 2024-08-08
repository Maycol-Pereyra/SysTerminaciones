import {  Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../shared/usuario.service';
import { ConfirmacionPasswordValidator } from './confirmacion-password.validator';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { finalize, first } from 'rxjs/operators';
import { regexCorreo } from 'src/app/_core/const/regexp.const';

@Component({
  selector: 'app-create-usuario-modal',
  templateUrl: './create-usuario-modal.component.html',
  styleUrls: ['./create-usuario-modal.component.scss'],
})
export class CreateUsuarioModalComponent extends FormBase implements OnInit, OnDestroy {
  isLoading$;

  vm: Usuario;
  empleados$;
  procesando = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: UsuarioService,
    private fb: FormBuilder,
    private itemSelectService: ItemSelectService,
    private accesosService: AccesosService,
    public modal: NgbActiveModal
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.empleados$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.empleado}`);

    this.loadCustomer();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadCustomer() {
    this.vm = this.getEmty();
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre: [this.vm.nombre, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      apellido: [this.vm.apellido, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      correo: [this.vm.correo, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(regexCorreo),
        Validators.maxLength(100)])
      ],
      empleadoId: [this.vm.empleadoId, Validators.compose([Validators.required])],
      login: [this.vm.login, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      password: [this.vm.password, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
      confirmacionPassword: ['', Validators.compose([Validators.required])],
    }, {
      validator: ConfirmacionPasswordValidator.passwordSonIguales
    });
  }

  save() {
    if (this.procesando) { return; }
    this.procesando = true;

    this.prepareVm();
    const sbCreate = this.service
      .create(this.vm)
      .pipe(
        first(),
        finalize(() => this.procesando = false)
      )
      .subscribe((res: any) => {
        if (res && res.id) {
          this.mensajeOk('El registro fue realizado correctamente.');
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sbCreate);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.nombre = formData.nombre;
    this.vm.apellido = formData.apellido;
    this.vm.correo = formData.correo;
    this.vm.empleadoId = formData.empleadoId;
    this.vm.login = formData.login;
    this.vm.password = formData.password;
  }

  private getEmty(): Usuario {
    return new Usuario(null);
  }
}
