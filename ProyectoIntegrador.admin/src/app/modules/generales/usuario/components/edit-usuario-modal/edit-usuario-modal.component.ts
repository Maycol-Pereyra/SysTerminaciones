import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../_core/services/authentication.service';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../shared/usuario.service';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { regexCorreo } from 'src/app/_core/const/regex.const';
import { maskCedula, maskRnc } from 'src/app/_core/const/formato-mascara';

@Component({
  selector: 'app-edit-usuario-modal',
  templateUrl: './edit-usuario-modal.component.html',
  styleUrls: ['./edit-usuario-modal.component.scss'],
})
export class EditUsuarioModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: Usuario;
  presentaEstado = true;
  empleados$;

  maskRnc = maskRnc;
  maskCedula = maskCedula;
  marcaEsRncCedula = false;
  
  private usuarioActualId = null;
  private subscriptions: Subscription[] = [];

  get campoRnc() {
    return this.formGroup.get('rnc') as FormControl;
  }

  constructor(
    public modal: NgbActiveModal,
    private service: UsuarioService,
    private accesosService: AccesosService,
    private fb: FormBuilder,
    private itemSelectService: ItemSelectService,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.empleados$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.empleado}`);
  
    this.loadUsuario();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
    this.service.limpiarMessege();
  }

  loadUsuario() {
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
        ).subscribe((item: Usuario) => {
          this.vm = item;
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
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
      estaActivo: [this.vm.estaActivo],
      empleadoId: [this.vm.empleadoId, Validators.compose([Validators.required])],
      login: [this.vm.login, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
      cedula: [this.vm.cedula, Validators.compose([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}')
      ])],
      pasaporte: [this.vm.pasaporte, Validators.compose([Validators.minLength(3), Validators.maxLength(30)])],
      rnc: [this.vm.rnc, Validators.compose([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}')
      ])],
      esRncCedula: [this.vm.esRncCedula, Validators.compose([Validators.nullValidator])],

    });

    this.subscriptions.push(
      this.authService.currentUserSubject
        .subscribe(value => {
          this.usuarioActualId = value.id;
          this.presentaEstado = +this.usuarioActualId !== + this.vm.id;
        })
    );

    this.marcaEsRncCedula = this.vm.esRncCedula;

    if (this.marcaEsRncCedula) {
      this.campoRnc.setValidators([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}')
      ]);
    } else {
      this.campoRnc.setValidators([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}')
      ]);
    }

    this.formGroup.get('esRncCedula').valueChanges.subscribe(val => {
      this.marcaEsRncCedula = val === undefined ? false : val;
      this.actualizaRnc();
    });
  }

  save() {
    this.prepareVm();
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

  activar(): void {
    if (this.accesosService.puedeActivar('generales.usuario.activar')) {
      this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de activar el usuario?', 'Confirmación', () => {
        const sb = this.authService.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('Se ha activado el usuario');
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
    if (this.accesosService.puedeInactivar('generales.usuario.inactivar')) {
      this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de inactivar el usuario?', 'Confirmación', () => {
        const sb = this.authService
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk('Se ha inactivado el usuario');
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  private getEmty(): Usuario {
    return new Usuario(null);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.nombre = formData.nombre;
    this.vm.apellido = formData.apellido;
    this.vm.correo = formData.correo;
    this.vm.login = formData.login;
    this.vm.estaActivo = formData.estaActivo;
    this.vm.empleadoId = formData.empleadoId;
    this.vm.cedula = formData.cedula;
    this.vm.rnc = formData.rnc;
    this.vm.pasaporte = formData.pasaporte;
  }

  private actualizaRnc(actualiza: boolean = true): void {
    if (this.marcaEsRncCedula) {
      this.campoRnc.setValidators([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}'),
      ]);
    } else {
      this.campoRnc.setValidators([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}'),
      ]);
    }

    if (actualiza) {
      this.campoRnc.updateValueAndValidity();
      this.cd.detectChanges();
    }
  }
}
