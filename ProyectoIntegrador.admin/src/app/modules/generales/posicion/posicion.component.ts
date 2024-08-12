/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-posicion',
  templateUrl: './posicion.component.html'
})
export class PosicionComponent implements OnInit {

  tipoRegistroId: number;
  titulo: string;
  accesoCrearId: string;
  accesoEditarId: string;
  accesoActivarId: string;
  accesoInactivarId: string;

  constructor() { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.tipoRegistroId = 3;
    this.titulo = 'Posición';
    this.accesoCrearId = 'generales.posicion.crear';
    this.accesoEditarId = 'generales.posicion.editar'; 
    this.accesoActivarId = 'generales.posicion.activar'; 
    this.accesoInactivarId = 'generales.posicion.inactivar';
  }
}
