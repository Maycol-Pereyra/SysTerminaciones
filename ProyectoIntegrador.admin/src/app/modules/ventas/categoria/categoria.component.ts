/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  tipoRegistroId: number;
  titulo: string;
  accesoCrearId: string;
  accesoEditarId: string;
  accesoActivarId: string;
  accesoInactivarId: string;

  constructor() { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.tipoRegistroId = 1;
    this.titulo = 'Categoría';
    this.accesoCrearId = 'ventas.categoria.crear';
    this.accesoEditarId = 'ventas.categoria.editar'; 
    this.accesoActivarId = 'ventas.categoria.activar'; 
    this.accesoInactivarId = 'ventas.categoria.inactivar';
  }
}
