import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  
  usuariosTotal = 42;
  usuariosInactivos = 2;
  usuariosBloqueados = 0;
  ingresosHoy = 125700;
  cotizacionesNuevas = 5;

  private subscriptions: Subscription[] = [];

  constructor(
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
