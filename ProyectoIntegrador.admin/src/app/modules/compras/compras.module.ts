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
import { ComprasRoutingModule } from './compras-routing.module';
import { GeneralesModule } from '../generales/generales.module';
import { ComprasComponent } from './compras.component';
import { EditSuplidorModalComponent } from './suplidor/components/edit-cliente-modal/edit-suplidor-modal.component';
import { SuplidorComponent } from './suplidor/suplidor.component';


@NgModule({
  declarations: [
  ComprasComponent,

  SuplidorComponent,
  EditSuplidorModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ComprasRoutingModule,
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
export class ComprasModule {}
