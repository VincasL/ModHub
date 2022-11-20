import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRestService } from '../../services/rest/auth-rest.service';
import { tap } from 'rxjs';
import { AuthService } from '../../services/shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authRestService: AuthRestService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;

    this.authRestService
      .login(formValue.email ?? '', formValue.password ?? '')
      .pipe(
        tap((loginDto) => this.authService.login(loginDto)),
        tap(() => this.router.navigate(['']))
      )
      .subscribe();
  }

  onRegisterClick() {
    this.router.navigate(['register'])
    return false;
  }
}
