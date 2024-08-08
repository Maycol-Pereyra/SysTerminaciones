import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesRoutingModule } from './generales-routing.module';
import { GeneralesComponent } from './generales.component';
import { ADVCRUDTableModule } from 'src/app/_core/crud-table';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditUsuarioModalComponent } from './usuario/components/edit-usuario-modal/edit-usuario-modal.component';
import { CreateUsuarioModalComponent } from './usuario/components/create-usuario-modal/create-usuario-modal.component';
import { DeletePerfilModalComponent } from './perfil/components/delete-perfil-modal/delete-perfil-modal.component';
import { EditPerfilModalComponent } from './perfil/components/edit-perfil-modal/edit-perfil-modal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { ConfiguracionGeneralComponent } from './configuracion-general/configuracion-general.component';
import {
  EditConfiguracionGeneralModalComponent
} from './configuracion-general/components/edit-configuracion-general-modal/edit-configuracion-general-modal.component';
import { PaisComponent } from './pais/pais.component';
import { EditPaisModalComponent } from './pais/components/edit-pais-modal/edit-pais-modal.component';


@NgModule({
  declarations: [
    GeneralesComponent,
    UsuarioComponent,
    EditUsuarioModalComponent,
    CreateUsuarioModalComponent,

    PerfilComponent,
    EditPerfilModalComponent,
    DeletePerfilModalComponent,

    ConfiguracionGeneralComponent,
    EditConfiguracionGeneralModalComponent,

    PaisComponent,
    EditPaisModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GeneralesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ADVCRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule,
    NgApexchartsModule,
    DxHtmlEditorModule
  ],
  entryComponents: [
    EditUsuarioModalComponent,
    CreateUsuarioModalComponent,
    EditPerfilModalComponent,
    DeletePerfilModalComponent,
    EditPaisModalComponent
  ]
})
export class GeneralesModule {}
