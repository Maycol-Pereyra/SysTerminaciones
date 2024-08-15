import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprasComponent } from './compras.component';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';
import { SuplidorComponent } from './suplidor/suplidor.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasComponent,
    children: [
      {
        path: 'suplidor',
        component: SuplidorComponent,
        data: {
          acceso: 'compras.suplidor.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      { path: '', redirectTo: 'suplidor', pathMatch: 'full' },
      { path: '**', redirectTo: 'suplidor', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasRoutingModule {}
