import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EditProductoDetalleProduccionComponent } from './edit/edit-producto-detalle-produccion-modal.component';
import { ProductoDetalleProduccion } from '../../../shared/producto-detalle-produccion.model';

@Component({
  selector: 'app-producto-detalle-produccion',
  templateUrl: './producto-detalle-produccion.component.html'
})
export class ProductoDetalleProduccionComponent implements OnInit, OnDestroy {
  @Input() productoId: number;
  @Input() listaDetalle: ProductoDetalleProduccion[];

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
    const row = new ProductoDetalleProduccion(null);

    const modalRef = this.modalService.open(EditProductoDetalleProduccionComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.index = -1;
    modalRef.componentInstance.nuevo = true;
    modalRef.componentInstance.productoId = this.productoId;
    modalRef.componentInstance.vm = row;
    modalRef.result.then((data: ProductoDetalleProduccion) => this.insertaItemEnDetalle(data, -1), () => {});
  }

  edit(row: any): void {
    const index = this.listaDetalle.indexOf(row);

    const modalRef = this.modalService.open(EditProductoDetalleProduccionComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.nuevo = false;
    modalRef.componentInstance.productoId = this.productoId;
    modalRef.componentInstance.vm = row;
    modalRef.result.then((data: ProductoDetalleProduccion) => this.insertaItemEnDetalle(data, index), () => {});
  }

  private insertaItemEnDetalle(data: ProductoDetalleProduccion, index: number): void {
    if (index >= 0) {
      this.listaDetalle[index] = data;
    } else {
      this.listaDetalle.push(data);
    }

    this.cambio.emit(true);
  }
}
