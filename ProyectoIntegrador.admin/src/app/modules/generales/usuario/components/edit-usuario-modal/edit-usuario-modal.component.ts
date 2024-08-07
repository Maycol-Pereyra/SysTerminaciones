import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../_core/services/authentication.service';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../shared/usuario.service';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { regexCorreo } from 'src/app/_core/const/regexp.const';

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
  perfiles$;
  sucursalAgencia$;
  usuarioCore$: Observable<ItemSelect[]>;

  private usuarioActualId = null;
  private subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    private service: UsuarioService,
    private accesosService: AccesosService,
    private fb: FormBuilder,
    private itemSelectService: ItemSelectService,
    private authService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.perfiles$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.generalesPerfil}`);
    this.sucursalAgencia$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.solicitudPrestamosSucursalAgencia}`);

    const filtroUsuarioCore = ItemSelectService.defaultFilter();
    filtroUsuarioCore.filter.push({ criterio: 'estaActivoId', valor: '1'});
    this.usuarioCore$ = this.itemSelectService.get(
      `${AppConfig.settings.api}${EndPointSelect.solicitudPrestamosUsuarioCore}`, filtroUsuarioCore);

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
      nota: [this.vm.nota, Validators.compose([Validators.maxLength(250)])],
      estaActivo: [this.vm.estaActivo],
      perfilId: [this.vm.perfilId, Validators.compose([Validators.required])],
      sucursalAgenciaId: [this.vm.sucursalAgenciaId, Validators.compose([Validators.nullValidator])],
      usuarioCoreId: [this.vm.usuarioCoreId, Validators.compose([Validators.nullValidator])],
      login: [this.vm.login, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
    });

    this.subscriptions.push(
      this.authService.currentUserSubject
        .subscribe(value => {
          this.usuarioActualId = value.id;
          this.presentaEstado = +this.usuarioActualId !== + this.vm.id;
        })
    );
  }

  quitarBloqueoEntradaFallida() {
    if (this.accesosService.puede(
      'generales.usuario.quitar-bloqueo',
      'Usted no tiene acceso a quitar bloqueo de acceso')
    ) {
      this.confirmacion('¿Está seguro de quitar el bloqueo de acceso?', 'Confirmación', ()=>{
        const sb = this.service
        .quitarBloqueoEntradaFallida(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('El bloqueo de acceso del cliente fue retirado.');
            this.modal.close();
          } else {
            this.mensajeValidacion(res.msg);
          }
        });
      this.subscriptions.push(sb);
      });
    }
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

  // helpers for View
  reiniciarClave(): void {
    if (this.accesosService.puede('generales.usuario.reiniciar-contrasena', 'Usted no tiene acceso para reiniciar contraseña.')) {
      const formData = this.formGroup.value;

      if (formData.correo === '') {
        this.mensajeValidacion ('Debe especificar el correo del usuario para poder proceder con el reinicio de clave');
        return;
      }

      this.confirmacion('¿Está seguro de reiniciar la contraseña?', 'Confirmación', () => {
        const sb = this.authService
          .solicitarPassword(this.vm.login)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk('La nueva contraseña fue enviada al correo electrónico del usuario');
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
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
    return {
      id: 0,
      identificador: '',
      nombre: '',
      apellido: '',
      nota: '',
      correo: '',
      estaActivo: true,
      login: '',
      password: '',
      token: '',
      requiereCambioPassword: true,
      perfilId: null,
      usuarioCoreId: null,
      sucursalAgenciaId: null,
      bloqueoEntradaFallida: false
    };
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.nombre = formData.nombre;
    this.vm.apellido = formData.apellido;
    this.vm.nota = formData.nota;
    this.vm.correo = formData.correo;
    this.vm.login = formData.login;
    this.vm.estaActivo = formData.estaActivo;
    this.vm.perfilId = formData.perfilId;
    this.vm.usuarioCoreId = formData.usuarioCoreId;
    this.vm.sucursalAgenciaId = formData.sucursalAgenciaId;
  }
}
