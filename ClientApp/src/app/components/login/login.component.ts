import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRestService } from '../../services/rest/auth-rest.service';
import { tap } from 'rxjs';

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
    private readonly authRestService: AuthRestService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;

    this.authRestService
      .login(formValue.email ?? '', formValue.password ?? '')
      .pipe(tap((x) => console.log(x))).subscribe();
  }
}
