import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { Mensajes } from 'src/app/_core/helpers/mensaje.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    login: '',
    password: '',
  };

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;

  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {
    this.isLoading$ = this.authenticationService.isLoading$;
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      login: [
        this.defaultAuth.login,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;

    const loginSubscr = this.authenticationService
      .login(this.f.login.value, this.f.password.value)
      .pipe(first())
      .subscribe((data: any) => {
        if (data && !data.id && data.msg) {
          Mensajes.toastWarning(data.msg);
          return;
        }

        if (data) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
          this.cdr.detectChanges();
        }
      },
      error => {
        this.hasError = true;
        this.cdr.detectChanges();
      });

    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
