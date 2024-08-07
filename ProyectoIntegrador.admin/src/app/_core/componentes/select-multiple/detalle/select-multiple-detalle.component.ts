import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonHelper } from 'src/app/_core/helpers/json.helper';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';

@Component({
  selector: 'app-select-multiple-detalle',
  templateUrl: 'select-multiple-detalle.component.html'
})

export class SelectMultipleDetalleComponent implements OnInit {

  @Input() listaOpciones: ItemSelect[] = [];

  listaPresentacion: ItemSelect[] = [];

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    this.listaPresentacion = JsonHelper.nuevoObjetoJson(this.listaOpciones);
  }

  cancelar(): void {
    this.modal.dismiss();
  }

  aceptar(): void {
    this.modal.close(this.listaPresentacion);
  }

  marcar(value: boolean): void {
    this.listaPresentacion.forEach(o => o.estaActivo = value);
  }
}
