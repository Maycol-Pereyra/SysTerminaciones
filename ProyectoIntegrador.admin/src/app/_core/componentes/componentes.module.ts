import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { SelectMultipleDetalleComponent } from './select-multiple/detalle/select-multiple-detalle.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectConBusquedaComponent } from './select-con-busqueda/select-con-busqueda.component';
import { RegistroComponent } from './registro/registro.component';
import { EditRegistroModalComponent } from './registro/components/edit-registro-modal/edit-registro-modal.component';
import { ADVCRUDTableModule } from '../crud-table';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SelectMultipleComponent,
    SelectMultipleDetalleComponent,
    SelectConBusquedaComponent,

    RegistroComponent,
    EditRegistroModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgSelectModule,
    ADVCRUDTableModule,
    NgbModalModule,
  ],
  exports: [
    SelectMultipleComponent,
    SelectMultipleDetalleComponent,
    SelectConBusquedaComponent,

    RegistroComponent,
    EditRegistroModalComponent
  ],
})
export class ComponentesModule { }
