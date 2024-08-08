import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';
import { GeneralesComponent } from './generales.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ConfiguracionGeneralComponent } from './configuracion-general/configuracion-general.component';
import { PaisComponent } from './pais/pais.component';

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
