import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SolicitudTomaMedidaComponent } from './solicitud-toma-medida/solicitud-toma-medida.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

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
      {
        path: 'producto',
        component: ProductoComponent,
        data: {
          acceso: 'ventas.producto.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'categoria',
        component: CategoriaComponent,
        data: {
          acceso: 'ventas.categoria.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'solicitud-toma-medida',
        component: SolicitudTomaMedidaComponent,
        data: {
          acceso: 'ventas.solicitud-toma-medida.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent,
        data: {
          acceso: 'ventas.cotizacion.acceder'
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
