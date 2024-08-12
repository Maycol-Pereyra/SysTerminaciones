/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html'
})
export class DepartamentoComponent implements OnInit {

  tipoRegistroId: number;
  titulo: string;
  accesoCrearId: string;
  accesoEditarId: string;
  accesoActivarId: string;
  accesoInactivarId: string;

  constructor() { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.tipoRegistroId = 2;
    this.titulo = 'Departamento';
    this.accesoCrearId = 'generales.departamento.crear';
    this.accesoEditarId = 'generales.departamento.editar'; 
    this.accesoActivarId = 'generales.departamento.activar'; 
    this.accesoInactivarId = 'generales.departamento.inactivar';
  }
}
