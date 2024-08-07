import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfiguracionGeneralPersonaFirma } from '../../../shared/configuracion-general-persona-firma.model';
import { FormBase } from 'src/app/_core/clase-base/form-base';

@Component({
  selector: 'app-configuracion-general-persona-firma',
  templateUrl: './configuracion-general-persona-firma.component.html',
  styleUrls: ['./configuracion-general-persona-firma.component.scss'],
})
export class ConfiguracionGeneralPersonaFirmaComponent extends FormBase implements OnInit, OnDestroy {
  @Input() listaDetalle: ConfiguracionGeneralPersonaFirma[];
  sucursal$;

  seleccionTodos = false;

  private subscriptions: Subscription[] = [];

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
