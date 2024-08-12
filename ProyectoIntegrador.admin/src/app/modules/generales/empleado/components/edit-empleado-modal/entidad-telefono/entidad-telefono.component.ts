import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EditEntidadTelefonoComponent } from './edit/edit-entidad-telefono-modal.component';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';
import { EntidadTelefono } from '../../../shared/entidad-telefono.model';

@Component({
  selector: 'app-entidad-telefono',
  templateUrl: './entidad-telefono.component.html'
})
export class EntidadTelefonoComponent implements OnInit, OnDestroy {
  @Input() listaDetalle: EntidadTelefono[];

  @Output() cambio = new EventEmitter<boolean>(true);

  private subscriptions: Subscription[] = [];

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // actions
  create(): void {
    const row = new EntidadTelefono(null);

    const modalRef = this.modalService.open(EditEntidadTelefonoComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.index = -1;
    modalRef.componentInstance.nuevo = true;
    modalRef.componentInstance.vm = row;
    modalRef.componentInstance.listaDetalle = this.listaDetalle;
    modalRef.result.then((data: EntidadTelefono) => this.insertaItemEnDetalle(data, -1), () => {});
  }

  edit(row: any): void {
    const index = this.listaDetalle.indexOf(row);

    const modalRef = this.modalService.open(EditEntidadTelefonoComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.nuevo = false;
    modalRef.componentInstance.vm = row;
    modalRef.componentInstance.listaDetalle = this.listaDetalle;
    modalRef.result.then((data: EntidadTelefono) => this.insertaItemEnDetalle(data, index), () => {});
  }

  cambiarEstado(row: any) { 
    Mensajes.confirmacion(`¿Está seguro de ${row.estaActivo ? 'inactivar' : 'activar'} esta relación?`, 'Confirmación', () => {
      row.estaActivo = !row.estaActivo;
      this.cambio.emit(true);
    });
  }

  private insertaItemEnDetalle(data: EntidadTelefono, index: number): void {
    if (index >= 0) {
      this.listaDetalle[index] = data;
    } else {
      this.listaDetalle.push(data);
    }

    this.cambio.emit(true);
  }
}
