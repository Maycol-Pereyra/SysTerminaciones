import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/app/_core/guards/app-auth.guard';
import { BancaMovilGeneralesComponent } from './banca-movil-generales.component';
import { CajeroComponent } from './cajero/cajero.component';
import { ConfiguracionGeneralComponent } from './configuracion-general/configuracion-general.component';
import { EntidadBancariaTransferenciaComponent } from './entidad-bancaria-transferencia/entidad-bancaria-transferencia.component';
import { InformacionCuentaBancoComponent } from './informacion-cuenta-banco/informacion-cuenta-banco.component';
import { MonedaComponent } from './moneda/moneda.component';
import { TipoPagoComponent } from './tipo-pago/tipo-pago.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursalContactoComponent } from './sucursal-contacto/sucursal-contacto.component';
import { TipoCertificacionComponent } from './tipo-certificacion/tipo-certificacion.component';
import { TipoServicioReclamacionComponent } from './tipo-servicio-reclamacion/tipo-servicio-reclamacion.component';

const routes: Routes = [
  {
    path: '',
    component: BancaMovilGeneralesComponent,
    children: [
      {
        path: 'cajero',
        component: CajeroComponent,
        data: {
          acceso: 'banca-movil.cajero.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'configuracion-general',
        component: ConfiguracionGeneralComponent,
        data: {
          acceso: 'banca-movil.configuracion-general.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'entidad-bancaria-transferencia',
        component: EntidadBancariaTransferenciaComponent,
        data: {
          acceso: 'banca-movil.entidad-bancaria-transferencia.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'informacion-cuenta-banco',
        component: InformacionCuentaBancoComponent,
        data: {
          acceso: 'banca-movil.informacion-cuenta-banco.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'moneda',
        component: MonedaComponent,
        data: {
          acceso: 'banca-movil.moneda.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'tipo-pago',
        component: TipoPagoComponent,
        data: {
          acceso: 'banca-movil.tipo-pago.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'sucursal',
        component: SucursalComponent,
        data: {
          acceso: 'banca-movil.sucursal.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'sucursal-contacto',
        component: SucursalContactoComponent,
        data: {
          acceso: 'banca-movil.sucursal-contacto.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'tipo-certificacion',
        component: TipoCertificacionComponent,
        data: {
          acceso: 'banca-movil.tipo-certificacion.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      {
        path: 'tipo-servicio-reclamacion',
        component: TipoServicioReclamacionComponent,
        data: {
          acceso: 'banca-movil.tipo-servicio-reclamacion.acceder'
        },
        canActivate: [AppAuthGuard]
      },
      // {
      //   path: 'consulta-certificaciones',
      //   component: ConsultaCertificacionesComponent,
      //   data: {
      //     acceso: 'banca-movil.consulta-certificaciones.acceder'
      //   },
      //   canActivate: [AppAuthGuard]
      // },
      { path: '', redirectTo: 'configuracion-general', pathMatch: 'full' },
      { path: '**', redirectTo: 'configuracion-general', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BancaMovilGeneralesRoutingModule { }
