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
import { CiudadComponent } from './ciudad/ciudad.component';
import { EditCiudadModalComponent } from './ciudad/components/edit-ciudad-modal/edit-ciudad-modal.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { EditProvinciaModalComponent } from './provincia/components/edit-provincia-modal/edit-provincia-modal.component';
import { SectorComponent } from './sector/sector.component';
import { EditSectorModalComponent } from './sector/components/edit-ciudad-modal/edit-sector-modal.component';
import { HerramientaComponent } from './herramienta/herramienta.component';
import { EditHerramientaModalComponent } from './herramienta/components/edit-herramienta-modal/edit-herramienta-modal.component';
import { UnidadComponent } from './unidad/unidad.component';
import { EditUnidadModalComponent } from './unidad/components/edit-unidad-modal/edit-unidad-modal.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { EditVehiculoModalComponent } from './vehiculo/components/edit-vehiculo-modal/edit-vehiculo-modal.component';
import { EditPaisModalComponent } from './pais/components/edit-pais-modal/edit-pais-modal.component';
import { PaisComponent } from './pais/pais.component';
import { ComponentesModule } from 'src/app/_core/componentes/componentes.module';
import { ColorComponent } from './color/color.component';


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
    EditPaisModalComponent,

    CiudadComponent,
    EditCiudadModalComponent,

    ProvinciaComponent,
    EditProvinciaModalComponent,

    SectorComponent,
    EditSectorModalComponent,

    HerramientaComponent,
    EditHerramientaModalComponent,

    UnidadComponent,
    EditUnidadModalComponent,

    VehiculoComponent,
    EditVehiculoModalComponent
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
    DxHtmlEditorModule,
    ComponentesModule
  ],
  entryComponents: [
    EditUsuarioModalComponent,
    CreateUsuarioModalComponent,
    EditPerfilModalComponent,
    DeletePerfilModalComponent,
    EditPaisModalComponent,
    ColorComponent
  ]
})
export class GeneralesModule {}
