import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, first, tap } from 'rxjs/operators';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { maskCedula, maskRnc } from 'src/app/_core/const/formato-mascara';
import { ValidacionHelper } from 'src/app/_core/helpers/validacion.helper';
import { Cliente } from '../../shared/cliente.model';
import { ClienteService } from '../../shared/cliente.service';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../shared/usuario.service';
import { ConfiguracionGeneral } from 'src/app/modules/banca-movil-generales/configuracion-general/shared/configuracion-general.model';
import {
  ConfiguracionGeneralService
} from 'src/app/modules/banca-movil-generales/configuracion-general/shared/configuracion-general.service';
import { regexCorreo } from 'src/app/_core/const/regexp.const';

@Component({
  selector: 'app-create-usuario-modal',
  templateUrl: './create-usuario-modal.component.html',
  styleUrls: ['./create-usuario-modal.component.scss'],
})
export class CreateUsuarioModalComponent extends FormBase implements OnInit, OnDestroy {
  isLoading$;

  vm: Usuario;

  panel = 1;
  maskCedula = maskCedula;
  maskRnc = maskRnc;
  marcaEsRncCedula = false;
  cargandoBusqueda = false;
  procesando = false;
  listaCliente: Cliente[] = [];
  searchGroup: FormGroup;

  get requiereCedulaPasaporteRnc(): boolean {
    if (this.formGroup) {
      const data = this.formGroup.value;

      return data.cedula.length === 0 && data.pasaporte.length === 0&& data.rnc.length === 0;
    }

    return false;
  }

  private config: ConfiguracionGeneral;
  private pageSize = 50;
  private subscriptions: Subscription[] = [];
  private loginValue = '';

  constructor(
    private service: UsuarioService,
    private clienteService: ClienteService,
    private configuracionGeneralService: ConfiguracionGeneralService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.cargarConfiguracionGeneral();
    this.searchForm();
    this.isLoading$ = this.service.isLoading$;
    this.loadPanel01();
  }

  isControlXValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return (control.valid && this.requiereCedulaPasaporteRnc === false) && (control.dirty || control.touched);
  }

  isControlXInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return (control.invalid || this.requiereCedulaPasaporteRnc) && (control.dirty || control.touched);
  }

  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });

    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe((val) => this.cargarCliente(val));
    this.subscriptions.push(searchEvent);
  }

  seleccionar(item: Cliente) {
    this.panel = 2;
    this.loadFormCliente(item);
  }

  loadFormCliente(cliente: Cliente) {
    this.vm = this.getEmty();

    const esManual = this.config.tipoAsignacionUsuario === 'manual';

    const rnc = this.getRncConFormato(cliente.rnc);

    this.marcaEsRncCedula = rnc.length === 13;

    this.formGroup = this.fb.group({
      clienteId: [cliente.id],
      nombre: [cliente.nombre, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      apellido: [cliente.apellido, Validators.compose([Validators.maxLength(100)])],
      correo: [cliente.correo, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(regexCorreo),
        Validators.maxLength(100)])
      ],
      cedula: [cliente.cedula, Validators.compose([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}'),
        ValidacionHelper.cedulaModulo10Validator(true)
      ])],
      pasaporte: [cliente.pasaporte, Validators.compose([
        Validators.maxLength(30)
      ])],
      rnc: [rnc, Validators.compose([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}'),
        ValidacionHelper.rncModulo11Validator(true)
      ])],
      esRncCedula: [this.marcaEsRncCedula, Validators.compose([Validators.nullValidator])],
      nota: ['', Validators.compose([Validators.maxLength(250)])],
      login: [{ value: '', disabled: !esManual}, Validators.compose([Validators.maxLength(100)])],
      estaActivo: [true, Validators.compose([Validators.nullValidator])],
    },
    {
      // validators: [ConfirmaIdentificacionValidator.RequiereIdentificacion],
    });


    if (this.config.tipoAsignacionUsuario === 'identificacion') {
      this.formGroup.get('cedula').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });

      this.formGroup.get('pasaporte').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });

      this.formGroup.get('rnc').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });
    }

    if (this.config.tipoAsignacionUsuario === 'correo') {
      this.formGroup.get('correo').valueChanges.subscribe(val => {
        setTimeout(() => {
          this.actualizarDatoLogin();
        }, 0);
      });
    }

    this.formGroup.get('esRncCedula').valueChanges.subscribe(val => {
      this.marcaEsRncCedula = !val ? false : val > 0;
      this.actualizaMarcaRnc();
    });

    // this.formGroup.get('cedula').updateValueAndValidity();
    // this.formGroup.get('pasaporte').updateValueAndValidity();
    // const controlRnc = this.formGroup.get('rnc') as FormControl;
    // controlRnc.updateValueAndValidity();
    this.actualizaMarcaRnc();
    this.actualizarDatoLogin();
  }

  actualizarDatoLogin() {
    const formData = this.formGroup.value;

    if (this.config.tipoAsignacionUsuario === 'identificacion') {
      this.loginValue = formData.cedula;
      this.loginValue = this.appReplace(this.loginValue, ' ', '');
      this.loginValue = this.appReplace(this.loginValue, '-', '');
      this.loginValue = this.appReplace(this.loginValue, '_', '');

      if (this.loginValue === '') {
        this.loginValue = formData.pasaporte;
        this.loginValue = this.appReplace(this.loginValue, ' ', '');
        this.loginValue = this.appReplace(this.loginValue, '-', '');
        this.loginValue = this.appReplace(this.loginValue, '_', '');
      }

      if (this.loginValue === '') {
        this.loginValue = formData.rnc;
        this.loginValue = this.appReplace(this.loginValue, ' ', '');
        this.loginValue = this.appReplace(this.loginValue, '-', '');
        this.loginValue = this.appReplace(this.loginValue, '_', '');
      }

      this.formGroup.get('login').setValue(this.loginValue);
    }

    if (this.config.tipoAsignacionUsuario === 'correo') {
      this.loginValue = formData.correo;
      this.formGroup.get('login').setValue(this.loginValue);
    }
  }

  appReplace(texto: string, searchString: string, replacer: string): string {
    while (texto.indexOf(searchString, 0) >= 0) {
      texto = texto.replace(searchString, replacer);
    }

    return texto;
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    if (this.validar()) {

      if (this.procesando) { return; }
      this.procesando = true;

      const sbUpdate = this.service
        .update(this.vm)
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
      this.subscriptions.push(sbUpdate);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private validar() {
    if (this.config.tipoAsignacionUsuario === 'identificacion') {
      let data = this.vm.cedula;
      data = this.appReplace(data, ' ', '');
      data = this.appReplace(data, '-', '');
      data = this.appReplace(data, '_', '');

      if (data.length === 0) {
        data = this.vm.pasaporte;
        data = this.appReplace(data, ' ', '');
        data = this.appReplace(data, '-', '');
        data = this.appReplace(data, '_', '');
      }

      if (data.length === 0) {
        data = this.vm.rnc;
        data = this.appReplace(data, ' ', '');
        data = this.appReplace(data, '-', '');
        data = this.appReplace(data, '_', '');
      }

      if (data.length === 0) {
        this.mensajeValidacion('Debe especificar la cédula, pasaporte o RNC');
        return false;
      }
    }

    if (this.vm.cedula.length === 0 && this.vm.pasaporte.length === 0 && this.vm.rnc.length === 0) {
      this.mensajeValidacion('Debe especificar la cédula, pasaporte y/o RNC');
      return false;
    }

    if (this.config.tipoAsignacionUsuario === 'correo') {
      if (this.vm.correo.length === 0) {
        this.mensajeValidacion('Debe especificar el correo');
        return false;
      }
    }

    if (this.config.tipoAsignacionUsuario === 'manual') {
      if (this.vm.login.length === 0) {
        this.mensajeValidacion('Debe especificar el usuario');
        return false;
      }
    }

    return true;
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.clienteId = formData.clienteId;
    this.vm.identificador = formData.identificador;
    this.vm.nombre = formData.nombre;
    this.vm.apellido = formData.apellido;
    this.vm.correo = formData.correo;
    this.vm.cedula = formData.cedula;
    this.vm.pasaporte = formData.pasaporte;
    this.vm.rnc = formData.rnc;
    this.vm.nota = formData.nota;
    this.vm.estaActivo = true;

    if (this.config.tipoAsignacionUsuario === 'manual') {
      this.vm.login = formData.login;
    } else {
      this.vm.login = this.loginValue;
    }
  }

  private cargarConfiguracionGeneral() {
    const sb = this.configuracionGeneralService
      .getItemById(1)
      .subscribe(data => {
        this.config = new ConfiguracionGeneral(data);
      });
    this.subscriptions.push(sb);
  }

  private loadPanel01() {
    this.panel = 1;
    this.cargarCliente('');
  }

  private cargarCliente(criterio: string): void {
    this.listaCliente = [];
    this.cdr.detectChanges();

    if (criterio.length === 0) {
      this.cargandoBusqueda = false;
      return;
    }

    this.cargandoBusqueda = true;

    const sb = this.clienteService
      .obtenerDatosIndex(criterio, this.pageSize)
      .pipe(
        tap(data => {
          this.listaCliente = data.items as Cliente [];
        }),
        finalize(() => {
          this.cargandoBusqueda = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
    this.subscriptions.push(sb);
  }

  private getEmty(): Usuario{
     return new Usuario(null);
  }

  private getRncConFormato(value: string): string {
    value = this.appReplace(value, ' ', '');
    value = this.appReplace(value, '-', '');
    value = this.appReplace(value, '_', '');

    if (value.length === 9) {
      return `${value.substring(0, 1)}-${value.substring(1, 3)}-${value.substring(3, 8)}-${value.substring(8, 9)}`;
    } else if (value.length === 11) {
      // 012-3456789-0
      return `${value.substring(0, 3)}-${value.substring(3, 10)}-${value.substring(10, 11)}`;
    }

    return '';
  }

  private actualizaMarcaRnc(): void {
    const campoRnc = this.formGroup.get('rnc') as FormControl;

    if (this.marcaEsRncCedula) {
      campoRnc.setValidators([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}'),
        ValidacionHelper.cedulaModulo10Validator(true)
      ]);
    } else {
      campoRnc.setValidators([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}'),
        ValidacionHelper.rncModulo11Validator(true)
      ]);
    }

    campoRnc.updateValueAndValidity();
    this.cdr.detectChanges();
  }
}
