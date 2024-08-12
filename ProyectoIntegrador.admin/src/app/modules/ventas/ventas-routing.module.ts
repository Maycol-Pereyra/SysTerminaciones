import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    children: [
      {
        path: 'cliente',
        component: ClienteComponent,
        data: {
          acceso: 'ventas.cliente.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      { path: '', redirectTo: 'cliente', pathMatch: 'full' },
      { path: '**', redirectTo: 'cliente', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
