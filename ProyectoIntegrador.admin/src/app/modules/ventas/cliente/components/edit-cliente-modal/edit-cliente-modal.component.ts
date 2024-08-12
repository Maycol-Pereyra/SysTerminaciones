import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../_core/services/authentication.service';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { regexCorreo } from 'src/app/_core/const/regexp.const';
import { maskCedula, maskRnc } from 'src/app/_core/const/formato-mascara';
import { Cliente } from '../../shared/cliente.model';
import { ClienteService } from '../../shared/cliente.service';

@Component({
  selector: 'app-edit-cliente-modal',
  templateUrl: './edit-cliente-modal.component.html'
})
export class EditClienteModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: Cliente;
  
  maskRnc = maskRnc;
  maskCedula = maskCedula;
  marcaEsRncCedula = false;
  
  private subscriptions: Subscription[] = [];

  get campoRnc() {
    return this.formGroup.get('rnc') as FormControl;
  }

  constructor(
    public modal: NgbActiveModal,
    private service: ClienteService,
    private accesosService: AccesosService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
    this.service.limpiarMessege();
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
        ).subscribe((item: Cliente) => {
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
      cedula: [this.vm.cedula, Validators.compose([
        Validators.pattern('[0123456789]{3}[-]{1}[0123456789]{7}[-]{1}[0123456789]{1}')
      ])],
      pasaporte: [this.vm.pasaporte, Validators.compose([Validators.minLength(3), Validators.maxLength(30)])],
      rnc: [this.vm.rnc, Validators.compose([
        Validators.pattern('[0123456789]{1}[-]{1}[0123456789]{2}[-]{1}[0123456789]{5}[-]{1}[0123456789]{1}')
      ])],
      esRncCedula: [this.vm.esRncCedula, Validators.compose([Validators.nullValidator])],
      tiempoCredito: [this.vm.tiempoCredito, Validators.compose([Validators.nullValidator])],
      limiteCredito: [this.vm.limiteCredito, Validators.compose([Validators.nullValidator])],
    });
      
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
    if (this.accesosService.puedeActivar('ventas.cliente.activar')) {
      this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de activar el cliente?', 'Confirmación', () => {
        const sb = this.authService.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('Se ha activado el cliente');
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
    if (this.accesosService.puedeInactivar('ventas.cliente.inactivar')) {
      this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de inactivar el cliente?', 'Confirmación', () => {
        const sb = this.authService
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk('Se ha inactivado el cliente');
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  private getEmty(): Cliente {
    return new Cliente(null);
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.nombre = formData.nombre;
    this.vm.apellido = formData.apellido;
    this.vm.correo = formData.correo;
    this.vm.cedula = formData.cedula;
    this.vm.rnc = formData.rnc;
    this.vm.esRncCedula = formData.esRncCedula;
    this.vm.pasaporte = formData.pasaporte;
    this.vm.tiempoCredito = formData.tiempoCredito;
    this.vm.limiteCredito = formData.limiteCredito;
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
