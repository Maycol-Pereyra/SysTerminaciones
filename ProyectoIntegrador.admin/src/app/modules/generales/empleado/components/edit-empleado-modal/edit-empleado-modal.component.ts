import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../_core/services/authentication.service';
import { Empleado } from '../../shared/empleado.model';
import { EmpleadoService } from '../../shared/empleado.service';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { AppConfig } from 'src/app/_core/services/app-config.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { regexCorreo } from 'src/app/_core/const/regex.const';
import { maskCedula, maskRnc } from 'src/app/_core/const/formato-mascara';

@Component({
  selector: 'app-edit-empleado-modal',
  templateUrl: './edit-empleado-modal.component.html'
})
export class EditEmpleadoModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: Empleado;
  presentaEstado = true;
  departamentos$;
  posiciones$;

  maskRnc = maskRnc;
  maskCedula = maskCedula;
  marcaEsRncCedula = false;
  
  private subscriptions: Subscription[] = [];

  get campoRnc() {
    return this.formGroup.get('rnc') as FormControl;
  }

  constructor(
    public modal: NgbActiveModal,
    private service: EmpleadoService,
    private accesosService: AccesosService,
    private fb: FormBuilder,
    private itemSelectService: ItemSelectService,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    const filtroDepartamento = ItemSelectService.defaultFilter();
    filtroDepartamento.filter.push({ criterio: 'tipoRegistroId', valor: '2'});
    this.departamentos$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.departamento}`, filtroDepartamento);

    const filtroPosicion = ItemSelectService.defaultFilter();
    filtroPosicion.filter.push({ criterio: 'tipoRegistroId', valor: '3'});
    this.posiciones$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.posicion}`, filtroPosicion);
  
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
        ).subscribe((item: Empleado) => {
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
      departamentoId: [this.vm.departamentoId, Validators.compose([Validators.required])],
      posicionId: [this.vm.posicionId, Validators.compose([Validators.required])],
      fechaIngreso: [this.getFechaParaComponente(this.vm.fechaIngreso), Validators.compose([Validators.required])],
      fechaTerminoContrato: [this.getFechaParaComponente(this.vm.fechaTerminoContrato), Validators.compose([Validators.nullValidator])],
      sueldo: [this.vm.sueldo, Validators.compose([Validators.required, Validators.min(1), Validators.max(99999999.99)])],
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
    if (this.accesosService.puedeActivar('generales.empleado.activar')) {
      this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de activar el empleado?', 'Confirmación', () => {
        const sb = this.authService.activar(this.vm.id)
        .subscribe((res: any) => {
          if (res && res.id) {
            this.mensajeOk('Se ha activado el empleado');
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
    if (this.accesosService.puedeInactivar('generales.empleado.inactivar')) {
      this.confirmacion('Guarde sus cambios antes de realizar esta acción. ¿Está seguro de inactivar el empleado?', 'Confirmación', () => {
        const sb = this.authService
          .inactivar(this.vm.id)
          .subscribe((res: any) => {
            if (res && res.id) {
              this.mensajeOk('Se ha inactivado el empleado');
              this.modal.close();
            } else {
              this.mensajeValidacion(res.msg);
            }
          });
        this.subscriptions.push(sb);
      });
    }
  }

  private getEmty(): Empleado {
    return new Empleado(null);
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
    this.vm.departamentoId = formData.departamentoId;
    this.vm.posicionId = formData.posicionId;
    this.vm.fechaIngreso = !formData.fechaIngreso
      ? null
      : new Date(formData.fechaIngreso.year, formData.fechaIngreso.month -1, formData.fechaIngreso.day);
    this.vm.fechaTerminoContrato = !formData.fechaTerminoContrato
      ? null
      : new Date(formData.fechaTerminoContrato.year, formData.fechaTerminoContrato.month -1, formData.fechaTerminoContrato.day);
    this.vm.sueldo = formData.sueldo;
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

  private getFechaParaComponente(value: Date | null): any {
    if (value === null || value === undefined) {
      return null;
    }

    value = new Date(value);
    const dia = value.getDate();
    const mes = value.getMonth() + 1;
    const ano = value.getFullYear();

    return {
      year: ano,
      month: mes,
      day: dia
    };

  }

  private getStringYYYYMMDDFromDate(value: Date | null): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const DELIMITER = '-';
    value = new Date(value);
    const dia = value.getDate();
    const mes = value.getMonth() + 1;
    const ano = value.getFullYear();
    return `${ano}` + DELIMITER + `${mes}` + DELIMITER + `${dia}`;
  }
}
