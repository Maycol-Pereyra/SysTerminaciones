import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { ItemSelect } from '../../../../../_core/item-select/item-select.model';
import { Sucursal } from '../../shared/sucursal.model';
import { SucursalService } from '../../shared/sucursal.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-edit-sucursal-modal',
  templateUrl: './edit-sucursal-modal.component.html',
  styleUrls: ['./edit-sucursal-modal.component.scss'],
})
export class EditSucursalModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  sucursal$ = new BehaviorSubject<any[]>([]);
  vm: Sucursal;

  private listaSucursal: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: SucursalService,
    private fb: FormBuilder,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    const sb = this.service.getItemSelectCore()
    .subscribe(items => {
      this.listaSucursal = items;
      this.sucursal$.next(items);
    });

    this.subscriptions.push(sb);

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
        this.vm = item as Sucursal;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      sucursalNuevoId: [this.vm.sucursalNuevoId, Validators.compose([Validators.required])],
      nombre: [this.vm.nombre, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      direccion: [this.vm.direccion, Validators.compose([Validators.required, Validators.maxLength(100)])],
      ciudad: [this.vm.ciudad, Validators.compose([Validators.required, Validators.maxLength(100)])],
      telefono: [this.vm.telefono, Validators.compose([Validators.maxLength(100)])],
      correo: [this.vm.correo, Validators.compose([Validators.maxLength(100)])],
      geolocalizacion: [this.vm.geolocalizacion, Validators.compose([Validators.maxLength(100)])],
    });

    this.formGroup.get('sucursalNuevoId').valueChanges.subscribe(val => {
      if (val && val > 0) {
        const x = this.listaSucursal.find(o => o.id === +val);
        if (x) {
          this.enCambioSucursal(x);
        }
      } else {
        this.enCambioSucursal(null);
      }
    });
  }

  save() {
    this.prepareVm();
    this.edit();
  }

  edit() {
    if (this.vm.id <= 0 && (!this.vm.sucursalNuevoId || this.vm.sucursalNuevoId <=0)) {
      this.mensajeValidacion('Debe de seleccionar la sucursal del core bancario');
      return;
    }

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

  enCambioSucursal(item: any): void {
    item = item || {};
    const controls = this.formGroup.controls;

    controls.nombre.setValue(item.nombre || '');
    controls.direccion.setValue(item.direccion || '');
    controls.ciudad.setValue(item.ciudad || '');
    controls.correo.setValue(item.correo || '');
    controls.telefono.setValue(item.telefono || '');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private prepareVm() {
    const formData = this.formGroup.value;
    this.vm.sucursalNuevoId = formData.sucursalNuevoId;
    this.vm.nombre = formData.nombre;
    this.vm.direccion = formData.direccion;
    this.vm.ciudad = formData.ciudad;
    this.vm.telefono = formData.telefono;
    this.vm.correo = formData.correo;
    this.vm.geolocalizacion = formData.geolocalizacion;
  }

  private getEmty(): Sucursal{
    return new Sucursal(null);
  }
}
