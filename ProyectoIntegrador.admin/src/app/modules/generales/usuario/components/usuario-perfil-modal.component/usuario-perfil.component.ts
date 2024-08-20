import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBase } from 'src/app/_core/clase-base/form-base';
import { PerfilService } from '../../../perfil/shared/perfil.service';
import { PerfilAcceso } from '../../../perfil/shared/perfil-acceso.model';
import { UsuarioPerfil } from '../../shared/usuario-perfil.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss'],
})
export class EditPerfilComponent extends FormBase implements OnInit, OnDestroy {
  @Input() listaDetalle: UsuarioPerfil[];

  isLoading$;
  seleccionTodos = false;

  listaAccesoFiltrada: UsuarioPerfil [];

  private subscriptions: Subscription[] = [];

  constructor(
    private service: PerfilService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public modal: NgbActiveModal
    ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;

    this.listaAccesoFiltrada = this.listaDetalle;
    
    this.evaluaSeleccionTodos();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  cambio(): void {
    this.evaluaSeleccionTodos();
    this.cdr.detectChanges();
  }

  cambioSeleccionTodos(): void {
    setTimeout(() => {
      this.seleccionTodos = !this.seleccionTodos;

      this.listaAccesoFiltrada.forEach(item => {
        item.seleccionado = this.seleccionTodos;
      });

      this.cdr.detectChanges();
    }, 0);
  }


  private evaluaSeleccionTodos() {
    let todos = this.listaAccesoFiltrada.length > 0;
    this.listaAccesoFiltrada.forEach(item => {
      if (item.seleccionado === false) {
        todos = false;
      }
    });

    this.seleccionTodos = todos;
  }

  

  private estanTodosSeleccionados(lista: PerfilAcceso []): boolean {
    let estanTodosMarcados = this.listaAccesoFiltrada.length > 0;
    lista.forEach(item => {
      if (item.seleccionado === false) {
        estanTodosMarcados = false;
      }
    });

    return estanTodosMarcados;
  }
}
