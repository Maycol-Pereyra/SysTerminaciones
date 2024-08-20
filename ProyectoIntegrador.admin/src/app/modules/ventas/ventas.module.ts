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
import { ProductoComponent } from './producto/producto.component';
import { EditProductoModalComponent } from './producto/components/edit-producto-modal/edit-producto-modal.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EditProductoUnidadComponent } from './producto/components/edit-producto-modal/producto-unidad/edit/edit-producto-unidad-modal.component';
import { ProductoUnidadComponent } from './producto/components/edit-producto-modal/producto-unidad/producto-unidad.component';
import { SolicitudTomaMedidaComponent } from './solicitud-toma-medida/solicitud-toma-medida.component';
import { EditSolicitudTomaMedidaModalComponent } from './solicitud-toma-medida/components/edit-solicitud-toma-medida-modal/edit-solicitud-toma-medida-modal.component';
import { InfoSolicitudTomaMedidaModalComponent } from './solicitud-toma-medida/components/info-solicitud-toma-medida-modal/info-solicitud-toma-medida-modal.component';
import { TomaMedidaSolicitudTomaMedidaModalComponent } from './solicitud-toma-medida/components/toma-medida-solicitud-toma-medida-modal/toma-medida-solicitud-toma-medida-modal.component';
import { InfoCotizacionModalComponent } from './cotizacion/components/info-cotizacion-modal/info-cotizacion-modal.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { EditCotizacionModalComponent } from './cotizacion/components/edit-cotizacion-modal/edit-cotizacion-modal.component';
import { EditProductoDetalleProduccionComponent } from './producto/components/edit-producto-modal/producto-detalle-produccion/edit/edit-producto-detalle-produccion-modal.component';
import { ProductoDetalleProduccionComponent } from './producto/components/edit-producto-modal/producto-detalle-produccion/producto-detalle-produccion.component';
import { EditFacturaModalComponent } from './factura/components/edit-factura-modal/edit-factura-modal.component';
import { InfoFacturaModalComponent } from './factura/components/info-factura-modal/info-factura-modal.component';
import { FacturaComponent } from './factura/factura.component';
import { EditCajaModalComponent } from './caja/components/edit-caja-modal/edit-caja-modal.component';
import { CajaComponent } from './caja/caja.component';
import { AbrirCajaModalComponent } from './caja/components/abrir-caja-modal/abrir-caja-modal.component';
import { CerrarCajaModalComponent } from './caja/components/cerrar-caja-modal/cerrar-caja-modal.component';

@NgModule({
  declarations: [
  VentasComponent,

  CategoriaComponent,

  ClienteComponent,
  EditClienteModalComponent,

  ProductoComponent,
  EditProductoModalComponent,

  ProductoUnidadComponent,
  EditProductoUnidadComponent,

  SolicitudTomaMedidaComponent,
  EditSolicitudTomaMedidaModalComponent,
  InfoSolicitudTomaMedidaModalComponent,
  TomaMedidaSolicitudTomaMedidaModalComponent,

  CotizacionComponent,
  InfoCotizacionModalComponent,
  EditCotizacionModalComponent,

  ProductoDetalleProduccionComponent,
  EditProductoDetalleProduccionComponent,

  FacturaComponent,
  EditFacturaModalComponent,
  InfoFacturaModalComponent,
  
  CajaComponent,
  EditCajaModalComponent,
  AbrirCajaModalComponent,
  CerrarCajaModalComponent
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
