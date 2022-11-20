import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import {
  BehaviorSubject,
  filter,
  first,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../modules/toaster/services/toast.service';
import { User } from '../../services/rest/models';
import { UsersRestService } from '../../services/rest/users-rest.service';
import {
  descriptionToRole,
  RoleDescription,
  roleToDescription,
} from '../../shared/enums/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  ActionType = UserActionType;
  roleToDescription = roleToDescription;

  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;
  private refreshUsersSubject = new BehaviorSubject<void>(undefined);
  refreshUsers$ = this.refreshUsersSubject.asObservable();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modalService: MdbModalService,
    private readonly toastService: ToastService,
    private readonly usersRestService: UsersRestService
  ) {}

  users$: Observable<User[]> = this.refreshUsers$.pipe(
    switchMap(() => this.usersRestService.getUsers())
  );

  roleDropdownOptions = [
    RoleDescription.Guest,
    RoleDescription.User,
    RoleDescription.Moderator,
    RoleDescription.Admin,
  ];

  ngOnInit(): void {}

  onActionClick(user: User, actionType: UserActionType) {
    switch (actionType) {
      case UserActionType.View:
        this.router.navigate(['user', user.id]);
        break;
      case UserActionType.ChangeRole:
        user.isRoleBeingEdited = true;
        break;
      case UserActionType.Delete:
        this.openModal(user);
        break;
      default:
        break;
    }

    return false;
  }

  openModal(user: User) {
    const title = `Are you sure you want to delete ${user.username}?`;
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title },
    });

    this.modalRef.onClose
      .pipe(
        map((result) => result.success),
        filter(Boolean),
        switchMap(() => this.usersRestService.deleteUser(user)),
        tap(() => {
          this.refreshUsersSubject.next();
          this.toastService.showSuccessToast('User deleted successfully');
        })
      )
      .subscribe();
  }

  onSaveRoleClick(user: User) {
    if (user.role === null || user.role === undefined) {
      return;
    }

    user.isRoleBeingEdited = false;

    this.usersRestService
      .putUserRole(user.id, user.role)
      .pipe(
        first(),
        tap(() => this.refreshUsersSubject.next()),
        tap(() =>
          this.toastService.showSuccessToast('Role updated successfully')
        )
      )
      .subscribe();

    return false;
  }

  onRoleChange($event: any, user: User) {
    user.role = descriptionToRole($event.value);
  }
}

enum UserActionType {
  View,
  ChangeRole,
  Delete,
}
