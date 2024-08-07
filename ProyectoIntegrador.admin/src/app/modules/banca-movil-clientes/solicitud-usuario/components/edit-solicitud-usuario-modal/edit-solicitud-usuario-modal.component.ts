import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { SolicitudUsuario } from '../../shared/solicitud-usuario.model';
import { SolicitudUsuarioService } from '../../shared/solicitud-usuario.service';
import { AccesosService } from 'src/app/_core/services/acceso.service';

@Component({
  selector: 'app-edit-solicitud-usuario-modal',
  templateUrl: './edit-solicitud-usuario-modal.component.html',
  styleUrls: ['./edit-solicitud-usuario-modal.component.scss'],
})
export class EditSolicitudUsuarioModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;

  vm: SolicitudUsuario;

  procesando = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: SolicitudUsuarioService,
    private fb: FormBuilder,
    private accesosService: AccesosService,
    public modal: NgbActiveModal,
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
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
      ).subscribe((item: SolicitudUsuario) => {
        this.vm = item;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre: [this.vm.nombre],
      apellido: [this.vm.apellido],
      tipoDocumentoId: [this.vm.tipoDocumentoId],
      tipoDocumentoDescripcion: [this.vm.tipoDocumentoDescripcion],
      documento: [this.vm.documento],
      login: [this.vm.login],
      tipoProductoId: [this.vm.tipoProductoId],
      tipoProductoDescripcion: [this.vm.tipoProductoDescripcion],
      productoNumero: [this.vm.productoNumero],
      telefono: [this.vm.telefono],
      correo: [this.vm.correo],
    });
  }

  integrar(clienteId: number) {
    if (this.procesando) { return; }
    this.procesando = true;

    const sb = this.service
      .integrar(this.vm.id, clienteId)
      .pipe(
        first(),
        finalize(() => this.procesando = false)
      )
      .subscribe((res: any) => {
        if (res && res.id) {
          this.mensajeOk('La solicitud de acceso fue procesada.');
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sb);
  }

  rechazar() {
    const sb = this.service
      .rechazar(this.vm.id)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.mensajeOk('La solicitud de acceso fue rechazada.');
          this.modal.close();
        } else {
          this.mensajeValidacion(res.msg);
        }
      });
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  private getEmty(): SolicitudUsuario{
    return new SolicitudUsuario(null);
 }
}
