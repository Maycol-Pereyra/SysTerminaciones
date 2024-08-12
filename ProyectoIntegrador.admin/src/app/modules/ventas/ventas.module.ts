import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ADVCRUDTableModule } from 'src/app/_core/crud-table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { ComponentesModule } from 'src/app/_core/componentes/componentes.module';
import { NgxMaskModule } from 'ngx-mask';
import { CustomDateParserFormatter } from 'src/app/_metronic/core';
import { VentasRoutingModule } from './ventas-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { EditClienteModalComponent } from './cliente/components/edit-cliente-modal/edit-cliente-modal.component';
import { GeneralesModule } from '../generales/generales.module';
import { VentasComponent } from './ventas.component';


@NgModule({
  declarations: [
  VentasComponent,
  ClienteComponent,
  EditClienteModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ADVCRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule,
    NgApexchartsModule,
    DxHtmlEditorModule,
    ComponentesModule,
    NgxMaskModule,
    GeneralesModule
  ],
  entryComponents: [

  ],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  exports: [
  ]
})
export class VentasModule {}
