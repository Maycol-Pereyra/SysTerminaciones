import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';
import { GeneralesComponent } from './generales.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ConfiguracionGeneralComponent } from './configuracion-general/configuracion-general.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { SectorComponent } from './sector/sector.component';
import { HerramientaComponent } from './herramienta/herramienta.component';
import { UnidadComponent } from './unidad/unidad.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { ColorComponent } from './color/color.component';
import { PaisComponent } from './pais/pais.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { PosicionComponent } from './posicion/posicion.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralesComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: {
          acceso: 'generales.perfil.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          acceso: 'generales.usuario.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'configuracion-general',
        component: ConfiguracionGeneralComponent,
        data: {
          acceso: 'generales.configuracion-general.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'pais',
        component: PaisComponent,
        data: {
          acceso: 'generales.pais.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'provincia',
        component: ProvinciaComponent,
        data: {
          acceso: 'generales.provincia.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'ciudad',
        component: CiudadComponent,
        data: {
          acceso: 'generales.ciudad.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'sector',
        component: SectorComponent,
        data: {
          acceso: 'generales.sector.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'herramienta',
        component: HerramientaComponent,
        data: {
          acceso: 'generales.herramienta.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'unidad',
        component: UnidadComponent,
        data: {
          acceso: 'generales.unidad.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'vehiculo',
        component: VehiculoComponent,
        data: {
          acceso: 'generales.vehiculo.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'color',
        component: ColorComponent,
        data: {
          acceso: 'generales.color.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'empleado',
        component: EmpleadoComponent,
        data: {
          acceso: 'generales.empleado.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'departamento',
        component: DepartamentoComponent,
        data: {
          acceso: 'generales.departamento.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'posicion',
        component: PosicionComponent,
        data: {
          acceso: 'generales.posicion.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      { path: '', redirectTo: 'empresa', pathMatch: 'full' },
      { path: '**', redirectTo: 'empresa', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralesRoutingModule {}
