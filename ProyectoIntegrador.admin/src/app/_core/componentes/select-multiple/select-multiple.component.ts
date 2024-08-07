import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectMultipleDetalleComponent } from './detalle/select-multiple-detalle.component';
import { ItemSelect } from '../../item-select/item-select.model';
import { JsonHelper } from '../../helpers/json.helper';
import { NumberHelper } from '../../helpers/number.helper';
import { StringHelper } from '../../helpers/string.helper';


@Component({
  selector: 'app-select-multiple',
  templateUrl: 'select-multiple.component.html',
  styleUrls: ['select-multiple.component.scss']
})

export class SelectMultipleComponent implements OnInit {
  @Input() titulo = '';
  @Input() textoAyuda = '';
  @Input() listaOpciones: ItemSelect[] = [];
  @Input() valorSeleccionado = '';
  @Input() esParaEditar = true;

  @Output() enCambioSeleccion = new EventEmitter();

  listaOpcionesPresentacion: string[] = [];
  listaOpcionesInterna: ItemSelect[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.listaOpcionesInterna = JsonHelper.nuevoObjetoJson(this.listaOpciones);
    this.marcarSeleccionados();
    this.presentarSeleccionados();
  }

  editarDetalle(): void {
    const modalRef = this.modalService.open(SelectMultipleDetalleComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.listaOpciones = this.listaOpcionesInterna;

    modalRef.result.then(
      (value) => {
        this.listaOpcionesInterna = value;
        this.presentarSeleccionados();
        this.emitirEvento();
      },
      () => { }
    );
  }

  private marcarSeleccionados(): void {
    this.listaOpcionesInterna.forEach(o => o.estaActivo = false);

    if (StringHelper.obtenerValorString(this.valorSeleccionado) !== '') {
      const valores = this.valorSeleccionado.split(',');

      for (const item of valores) {
        const existe = this.listaOpcionesInterna.find(o => o.id === NumberHelper.obtenerValorNumerico(item));
        if (existe) {
          existe.estaActivo = true;
        }
      };
    }
  }

  private presentarSeleccionados(): void {
    this.listaOpcionesPresentacion = this.listaOpcionesInterna
      .filter(o => o.estaActivo)
      .map(o => o.descripcion);
  }

  private emitirEvento(): void {
    if (this.enCambioSeleccion.observers.length <= 0) {
      return;
    }

    const seleccionadoId = this.listaOpcionesInterna
      .filter(o => o.estaActivo)
      .map(o => o.id)
      .join(',');

    this.enCambioSeleccion.emit(seleccionadoId);
  }
}
