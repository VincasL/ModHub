import { Component, OnInit } from '@angular/core';
import { UsersRestService } from '../../services/rest/users-rest.service';
import { roleToDescription } from '../../shared/enums/role';
import { BehaviorSubject, first, switchMap, tap } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../services/rest/models';
import { ToastService } from '../../modules/toaster/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  form = this.fb.group({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private readonly usersRestService: UsersRestService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  roleToDescription = roleToDescription;

  private refreshUserSubject = new BehaviorSubject<void>(undefined);
  refreshUser$ = this.refreshUserSubject.asObservable();

  user$ = this.refreshUser$.pipe(
    switchMap(() => this.usersRestService.getCurrentUser()),
    tap((user) => {
      this.form.patchValue(user);
    })
  );

  ngOnInit(): void {}

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value as unknown as User;

    this.usersRestService
      .putCurrentUser(formValue)
      .pipe(
        first(),
        tap(() => this.refreshUserSubject.next()),
        tap(() =>
          this.toastService.showSuccessToast('Profile updated successfully')
        )
      )
      .subscribe();
  }
}
