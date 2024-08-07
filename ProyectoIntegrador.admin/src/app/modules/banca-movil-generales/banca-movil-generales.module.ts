/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BancaMovilGeneralesRoutingModule } from './banca-movil-generales-routing.module';
import { BancaMovilGeneralesComponent } from './banca-movil-generales.component';
import { ADVCRUDTableModule } from 'src/app/_core/crud-table';
import { CustomAdapter, CustomDateParserFormatter } from '../../_metronic/core/utils/date-picker.utils';
import { NgxMaskModule } from 'ngx-mask';
import { CajeroComponent } from './cajero/cajero.component';
import { EditCajeroModalComponent } from './cajero/components/edit-cajero-modal/edit-cajero-modal.component';
import { DeleteCajeroModalComponent } from './cajero/components/delete-cajero-modal/delete-cajero-modal.component';
import { EntidadBancariaTransferenciaComponent } from './entidad-bancaria-transferencia/entidad-bancaria-transferencia.component';
import { EditEntidadBancariaTransferenciaModalComponent } from './entidad-bancaria-transferencia/components/edit-entidad-bancaria-transferencia-modal/edit-entidad-bancaria-transferencia-modal.component';
import { DeleteEntidadBancariaTransferenciaModalComponent } from './entidad-bancaria-transferencia/components/delete-entidad-bancaria-transferencia-modal/delete-entidad-bancaria-transferencia-modal.component';
import { InformacionCuentaBancoComponent } from './informacion-cuenta-banco/informacion-cuenta-banco.component';
import { EditInformacionCuentaBancoModalComponent } from './informacion-cuenta-banco/components/edit-informacion-cuenta-banco-modal/edit-informacion-cuenta-banco-modal.component';
import { DeleteInformacionCuentaBancoModalComponent } from './informacion-cuenta-banco/components/delete-informacion-cuenta-banco-modal/delete-informacion-cuenta-banco-modal.component';
import { ConfiguracionGeneralComponent } from './configuracion-general/configuracion-general.component';
import { EditConfiguracionGeneralModalComponent } from './configuracion-general/components/edit-configuracion-general-modal/edit-configuracion-general-modal.component';
import { MonedaComponent } from './moneda/moneda.component';
import { EditMonedaModalComponent } from './moneda/components/edit-moneda-modal/edit-moneda-modal.component';
import { DeleteMonedaModalComponent } from './moneda/components/delete-moneda-modal/delete-moneda-modal.component';
import { TipoPagoComponent } from './tipo-pago/tipo-pago.component';
import { EditTipoPagoModalComponent } from './tipo-pago/components/edit-tipo-pago-modal/edit-tipo-pago-modal.component';
import { DeleteTipoPagoModalComponent } from './tipo-pago/components/delete-tipo-pago-modal/delete-tipo-pago-modal.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { EditSucursalModalComponent } from './sucursal/components/edit-sucursal-modal/edit-sucursal-modal.component';
import { DeleteSucursalModalComponent } from './sucursal/components/delete-sucursal-modal/delete-sucursal-modal.component';
import { SucursalContactoComponent } from './sucursal-contacto/sucursal-contacto.component';
import { EditSucursalContactoModalComponent } from './sucursal-contacto/components/edit-sucursal-contacto-modal/edit-sucursal-contacto-modal.component';
import { DeleteSucursalContactoModalComponent } from './sucursal-contacto/components/delete-sucursal-contacto-modal/delete-sucursal-contacto-modal.component';
import { TipoCertificacionComponent } from './tipo-certificacion/tipo-certificacion.component';
import { EditTipoCertificacionModalComponent } from './tipo-certificacion/components/edit-tipo-certificacion-modal/edit-tipo-certificacion-modal.component';
import { DeleteTipoCertificacionModalComponent } from './tipo-certificacion/components/delete-tipo-certificacion-modal/delete-tipo-certificacion-modal.component';
import { ConfiguracionGeneralPersonaFirmaComponent } from './configuracion-general/components/edit-configuracion-general-modal/persona-firma/configuracion-general-persona-firma.component';
import { TipoServicioReclamacionComponent } from './tipo-servicio-reclamacion/tipo-servicio-reclamacion.component';
import { EditTipoServicioReclamacionModalComponent } from './tipo-servicio-reclamacion/components/edit-tipo-servicio-reclamacion-modal/edit-tipo-servicio-reclamacion-modal.component';
import { DeleteTipoServicioReclamacionModalComponent } from './tipo-servicio-reclamacion/components/delete-tipo-servicio-reclamacion-modal/delete-tipo-servicio-reclamacion-modal.component';

@NgModule({
  declarations: [
    BancaMovilGeneralesComponent,

    CajeroComponent,
    EditCajeroModalComponent,
    DeleteCajeroModalComponent,

    EntidadBancariaTransferenciaComponent,
    EditEntidadBancariaTransferenciaModalComponent,
    DeleteEntidadBancariaTransferenciaModalComponent,

    InformacionCuentaBancoComponent,
    EditInformacionCuentaBancoModalComponent,
    DeleteInformacionCuentaBancoModalComponent,

    ConfiguracionGeneralComponent,
    EditConfiguracionGeneralModalComponent,
    ConfiguracionGeneralPersonaFirmaComponent,

    MonedaComponent,
    EditMonedaModalComponent,
    DeleteMonedaModalComponent,

    TipoPagoComponent,
    EditTipoPagoModalComponent,
    DeleteTipoPagoModalComponent,

    SucursalComponent,
    EditSucursalModalComponent,
    DeleteSucursalModalComponent,

    SucursalContactoComponent,
    EditSucursalContactoModalComponent,
    DeleteSucursalContactoModalComponent,

    TipoCertificacionComponent,
    EditTipoCertificacionModalComponent,
    DeleteTipoCertificacionModalComponent,

    TipoServicioReclamacionComponent,
    EditTipoServicioReclamacionModalComponent,
    DeleteTipoServicioReclamacionModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BancaMovilGeneralesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ADVCRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule,
    NgxMaskModule
  ],
  entryComponents: [
    EditCajeroModalComponent,
    DeleteCajeroModalComponent,

    EditEntidadBancariaTransferenciaModalComponent,
    DeleteEntidadBancariaTransferenciaModalComponent,

    EditInformacionCuentaBancoModalComponent,
    DeleteInformacionCuentaBancoModalComponent,

    EditConfiguracionGeneralModalComponent,

    EditMonedaModalComponent,
    DeleteMonedaModalComponent,

    EditSucursalModalComponent,
    DeleteSucursalModalComponent,

    EditTipoPagoModalComponent,
    DeleteTipoPagoModalComponent,

    EditSucursalContactoModalComponent,
    DeleteSucursalContactoModalComponent,
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class BancaMovilGeneralesModule {}
