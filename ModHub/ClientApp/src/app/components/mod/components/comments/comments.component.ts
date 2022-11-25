import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/services/rest/models';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentsRestService } from '../../../../services/rest/comments-rest.service';
import { AuthService } from '../../../../services/shared/auth.service';
import { ConfirmModalComponent } from '../../../confirm-modal/confirm-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastService } from '../../../../modules/toaster/services/toast.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleDescription } from '../../../../shared/enums/role';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  Role = RoleDescription;
  confirmModalRef: MdbModalRef<ConfirmModalComponent> | null = null;
  newCommentForm = this.fb.group({
    text: new FormControl(null, Validators.required),
  });

  isCommentsLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly commentsRestService: CommentsRestService,
    readonly authService: AuthService,
    private readonly modalService: MdbModalService,
    private readonly toastService: ToastService,
    private readonly fb: FormBuilder
  ) {}

  private refreshCommentsSubject = new BehaviorSubject<void>(undefined);
  refreshComments$ = this.refreshCommentsSubject.asObservable();

  routeParams$ = this.route.params.pipe(
    map((params) => {
      return {
        gameId: params['gameId'] as number,
        modId: params['modId'] as number,
      };
    })
  );

  comments$: Observable<Comment[]> = combineLatest([
    this.routeParams$,
    this.refreshComments$,
  ]).pipe(
    tap(() => (this.isCommentsLoading = true)),

    switchMap(([params]) =>
      this.commentsRestService.getComments(params.gameId, params.modId)
    ),
    tap(() => (this.isCommentsLoading = false))
  );

  ngOnInit(): void {}

  onEditClick(comment: Comment) {
    comment.isTextBeingEdited = true;
    return false;
  }

  onDeleteClick(comment: Comment) {
    this.openDeleteConfirmationModal(comment);
    return false;
  }

  openDeleteConfirmationModal(comment: Comment) {
    const title = `Are you sure you want to delete this comment?`;
    this.confirmModalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title, isSuccess: false, saveButtonText: 'Delete' },
    });

    this.confirmModalRef.onClose
      .pipe(
        map((result) => result.success),
        filter(Boolean),
        withLatestFrom(this.routeParams$),
        switchMap(([_, routeParams]) =>
          this.commentsRestService.deleteComment(
            routeParams.gameId,
            routeParams.modId,
            comment.id
          )
        ),
        tap(() => this.refreshCommentsSubject.next()),
        tap(() => this.toastService.showSuccessToast('Comment deleted'))
      )
      .subscribe();
  }

  onSaveCommentClick(comment: Comment) {
    comment.isTextBeingEdited = false;

    this.routeParams$
      .pipe(
        first(),
        switchMap((params) =>
          this.commentsRestService.putComment(
            params.gameId,
            params.modId,
            comment.id,
            comment.text
          )
        ),
        tap(() => this.refreshCommentsSubject.next())
      )
      .subscribe();

    return false;
  }

  onCommentTextChange(comment: Comment, $event: Event) {
    comment.text = ($event.target as HTMLInputElement).value;
  }

  onNewCommentSubmit() {
    this.newCommentForm.markAllAsTouched();

    if (this.newCommentForm.invalid) {
      return;
    }

    const formValue = this.newCommentForm.value;

    this.routeParams$
      .pipe(
        first(),
        switchMap((params) =>
          this.commentsRestService.postComment(
            params.gameId,
            params.modId,
            formValue as unknown as Comment
          )
        ),
        tap(() => {
          this.refreshCommentsSubject.next();
          this.toastService.showSuccessToast('Comment submitted successfully');
          this.newCommentForm.reset();
        })
      )
      .subscribe();
  }
}
