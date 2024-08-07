import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { SelectMultipleDetalleComponent } from './select-multiple/detalle/select-multiple-detalle.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectConBusquedaComponent } from './select-con-busqueda/select-con-busqueda.component';

@NgModule({
  declarations: [
    SelectMultipleComponent,
    SelectMultipleDetalleComponent,
    SelectConBusquedaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgSelectModule,
  ],
  exports: [
    SelectMultipleComponent,
    SelectMultipleDetalleComponent,
    SelectConBusquedaComponent
  ],
})
export class ComponentesModule { }
