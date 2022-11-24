import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter, first,
  iif,
  map,
  mapTo,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Game, Mod } from '../../../../../../services/rest/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ModsRestService } from '../../../../../../services/rest/mods-rest.service';
import { AuthService } from '../../../../../../services/shared/auth.service';
import { ConfirmModalComponent } from '../../../../../confirm-modal/confirm-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-mod-list',
  templateUrl: './mod-list.component.html',
  styleUrls: ['./mod-list.component.css'],
})
export class ModListComponent implements OnInit {
  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private modalService: MdbModalService
  ) {}

  private refreshModsSubject = new BehaviorSubject<void>(undefined);
  refreshMods$ = this.refreshModsSubject.asObservable();

  mods$: Observable<Mod[]> = combineLatest([
    this.route.params,
    this.refreshMods$,
  ]).pipe(
    map(([params]) => params['gameId']),
    switchMap((gameId) => this.modsRestService.getMods(gameId))
  );

  ngOnInit(): void {}

  onModClick(mod: Mod) {
    this.router.navigate(['mod', mod.id], { relativeTo: this.route });
  }

  onModRatingChange(event: { modId: number; rating: number }) {
    const putModRating$ = this.modsRestService
      .putModRating(event.modId, event.rating)
      .pipe(tap(() => this.refreshModsSubject.next()));

    this.authService.isLoggedIn$
      .pipe(
        first(),
        switchMap((isLoggedIn) =>
          iif(() => isLoggedIn, putModRating$, this.openLoginPromptModal())
        )
      )
      .subscribe();
  }

  openLoginPromptModal(): Observable<void> {
    const title = `You have to be logged in to rate mods`;
    const text = 'Register or login to rate this mod'
    const saveButtonText = 'Login';

    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title, saveButtonText, text },
    });

    return this.modalRef.onClose.pipe(
      map((result) => result.success),
      filter(Boolean),
      switchMap(() => this.router.navigate(['login'])),
      map(() => void 0)
    );
  }
}
