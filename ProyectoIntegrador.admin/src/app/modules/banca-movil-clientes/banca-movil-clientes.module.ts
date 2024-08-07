/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BancaMovilClientesRoutingModule } from './banca-movil-clientes-routing.module';
import { BancaMovilClientesComponent } from './banca-movil-clientes.component';
import { ADVCRUDTableModule } from 'src/app/_core/crud-table';
import { CustomAdapter, CustomDateParserFormatter } from '../../_metronic/core/utils/date-picker.utils';
import { UsuarioComponent } from './usuario/usuario.component';
import { CreateUsuarioModalComponent } from './usuario/components/create-usuario-modal/create-usuario-modal.component';
import { EditUsuarioModalComponent } from './usuario/components/edit-usuario-modal/edit-usuario-modal.component';
import { DeleteUsuarioModalComponent } from './usuario/components/delete-usuario-modal/delete-usuario-modal.component';
import { SolicitudUsuarioComponent } from './solicitud-usuario/solicitud-usuario.component';
import { EditSolicitudUsuarioModalComponent } from './solicitud-usuario/components/edit-solicitud-usuario-modal/edit-solicitud-usuario-modal.component';
import { LoginHistoricoComponent } from './login-historico/login-historico.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    BancaMovilClientesComponent,

    UsuarioComponent,
    CreateUsuarioModalComponent,
    EditUsuarioModalComponent,
    DeleteUsuarioModalComponent,
    SolicitudUsuarioComponent,
    EditSolicitudUsuarioModalComponent,
    LoginHistoricoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BancaMovilClientesRoutingModule,
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
    CreateUsuarioModalComponent,
    EditUsuarioModalComponent,
    DeleteUsuarioModalComponent,
    EditSolicitudUsuarioModalComponent,
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class BancaMovilClientesModule {}
