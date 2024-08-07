import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';
import { BancaMovilClientesComponent } from './banca-movil-clientes.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SolicitudUsuarioComponent } from './solicitud-usuario/solicitud-usuario.component';
import { LoginHistoricoComponent } from './login-historico/login-historico.component';



const routes: Routes = [
  {
    path: '',
    component: BancaMovilClientesComponent,
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          acceso: 'banca-movil.usuario.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'solicitud-usuario',
        component: SolicitudUsuarioComponent,
        data: {
          acceso: 'banca-movil.solicitud-usuario.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'login-historico',
        component: LoginHistoricoComponent,
        data: {
          acceso: 'banca-movil.login-historico.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      { path: '', redirectTo: 'solicitud-usuario', pathMatch: 'full' },
      { path: '**', redirectTo: 'solicitud-usuario', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BancaMovilClientesRoutingModule { }
