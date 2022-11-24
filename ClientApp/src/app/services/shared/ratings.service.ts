import { Injectable } from '@angular/core';
import {
  defer,
  filter,
  first,
  iif,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ModsRestService } from '../rest/mods-rest.service';
import { AuthService } from './auth.service';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  constructor(
    private readonly modsRestService: ModsRestService,
    private readonly authService: AuthService,
    private readonly modalService: MdbModalService,
    private readonly router: Router
  ) {}

  onModRatingChange(modId: number, rating: number): Observable<boolean> {
    const putModRating$ = this.modsRestService.putModRating(modId, rating);

    return this.authService.isLoggedIn$.pipe(
      first(),
      switchMap((isLoggedIn) =>
        iif(
          () => isLoggedIn,
          defer(() => putModRating$.pipe(map(() => true))),
          defer(() => this.openLoginPromptModal().pipe(map(() => false)))
        )
      )
    );
  }

  private openLoginPromptModal(): Observable<boolean> {
    const title = `You have to be logged in to rate mods`;
    const text = 'Register or login to rate this mod';
    const saveButtonText = 'Login';

    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title, saveButtonText, text },
    });

    return this.modalRef.onClose.pipe(
      map((result) => result.success),
      filter(Boolean),
      switchMap(() => this.router.navigate(['login'])),
      map(() => true)
    );
  }
}
