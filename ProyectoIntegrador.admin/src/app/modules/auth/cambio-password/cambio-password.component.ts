import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { ConfirmacionPasswordValidator } from './confirmacion-password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss'],
})
export class CambioPasswordComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.isLoading$ = this.authenticationService.isLoading$;
    // Si no esta logueado lo redirecciona
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      passwordViejo: ['', Validators.compose([Validators.required])],
      passwordNuevo: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]),
      ],
      confirmacionPassword: ['', Validators.compose([Validators.required])],
    }, {
      validator: Validators.compose([
        ConfirmacionPasswordValidator.passwordSonIguales,
        ConfirmacionPasswordValidator.passwordViejoNuevoSonIguales
      ])
    });
  }

  submit() {
    this.hasError = false;

    const loginSubscr = this.authenticationService
      .cambiarPassword(this.f.passwordViejo.value, this.f.passwordNuevo.value)
      .subscribe((res: any) => {
          if (res && res.id) {
            this.authenticationService.logout();
            this.router.navigate(['/']);
          } else {
            this.mensajeValidacion(res.msg);
          }
        },
        error => {
          this.hasError = true;
        });

    this.unsubscribe.push(loginSubscr);
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  mensajeValidacion(msg: string): void {
    Swal.fire('Validación', msg, 'warning');
  }
}
