import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FormBase } from '../../../../../_core/clase-base/form-base';
import { ItemSelect } from 'src/app/_core/item-select/item-select.model';
import { SolicitudTomaMedida } from '../../shared/solicitud-toma-medida.model';
import { SolicitudTomaMedidaService } from '../../shared/solicitud-toma-medida.service';
import { NumeroMixto } from 'src/app/_core/models/numero-mixto.model';
import { ItemSelectService } from 'src/app/_core/item-select/item-select.service';
import { EndPointSelect } from 'src/app/_core/const/app.const';
import { AppConfig } from 'src/app/_core/services/app-config.service';

@Component({
  selector: 'app-info-solicitud-toma-medida-modal',
  templateUrl: './info-solicitud-toma-medida-modal.component.html',
})
export class InfoSolicitudTomaMedidaModalComponent extends FormBase implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  vm: SolicitudTomaMedida;
  producto$;

  public listaProducto: ItemSelect[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: SolicitudTomaMedidaService,
    public modal: NgbActiveModal,
    private itemSelectService: ItemSelectService
    ) {
    super();
  }

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.producto$ = this.itemSelectService.get(`${AppConfig.settings.api}${EndPointSelect.producto}`);
    this.producto$.subscribe(data => this.listaProducto = data as ItemSelect[]);

    this.loadData();
  }

  loadData() {
    const sb = this.service.getItemById(this.id)
    .pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.getEmty());
      })
    ).subscribe(item => {
      this.vm = item as SolicitudTomaMedida;
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  public getProductoDescripcion(row: any): string {
    const elemento = this.listaProducto.find(o => +o.id === +row.productoId)

    return !elemento ? '' : elemento.descripcion;
  }

  public getNumeroMixto(medida: number): string {
    const medidaString = new NumeroMixto(medida);

    return medidaString.numeroString;
  }

  private getEmty(): SolicitudTomaMedida{
    return new SolicitudTomaMedida(null);
  }
}
