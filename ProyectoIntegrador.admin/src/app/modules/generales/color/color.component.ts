/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html'
})
export class ColorComponent implements OnInit {

  tipoRegistroId: number;
  titulo: string;
  accesoCrearId: string;
  accesoEditarId: string;
  accesoActivarId: string;
  accesoInactivarId: string;

  constructor() { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.tipoRegistroId = 5;
    this.titulo = 'Color';
    this.accesoCrearId = 'generales.color.crear';
    this.accesoEditarId = 'generales.color.editar'; 
    this.accesoActivarId = 'generales.color.activar'; 
    this.accesoInactivarId = 'generales.color.inactivar';
  }
}
