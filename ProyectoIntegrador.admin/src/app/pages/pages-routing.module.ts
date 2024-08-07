import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureFlagGuard } from '../_core/guards/feature-flag.guard';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'generales',
        loadChildren: () =>
          import('../modules/generales/generales.module').then(
            (m) => m.GeneralesModule
          ),
      },
      {
        path: 'banca-movil-generales',
        data: {
          feature: 'BancaMovil'
        },
        canActivate: [FeatureFlagGuard],
        loadChildren: () =>
          import('../modules/banca-movil-generales/banca-movil-generales.module').then(
            (m) => m.BancaMovilGeneralesModule
          ),
      },
      {
        path: 'banca-movil-clientes',
        data: {
          feature: 'BancaMovil'
        },
        canActivate: [FeatureFlagGuard],
        loadChildren: () =>
          import('../modules/banca-movil-clientes/banca-movil-clientes.module').then(
            (m) => m.BancaMovilClientesModule
          ),
      },
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
