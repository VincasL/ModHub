import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { AuthRestService } from '../../services/rest/auth-rest.service';
import { AuthService } from '../../services/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.nonNullable.group(
    {
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    },
    { validators: matchingPasswordsValidator }
  );

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authRestService: AuthRestService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;

    this.authRestService
      .register(
        formValue.email ?? '',
        formValue.password ?? '',
        formValue.username ?? ''
      )
      .pipe(
        tap((loginDto) => this.authService.login(loginDto)),
        tap(() => this.router.navigate(['']))
      )
      .subscribe();
  }

  onLoginClick() {
    this.router.navigate(['login']);
    return false;
  }
}

export const matchingPasswordsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password1 = control.get('password');
  const password2 = control.get('repeatPassword');

  return password1 && password2 && password1.value !== password2.value
    ? { passwordsDoNotMatch: true }
    : null;
};
