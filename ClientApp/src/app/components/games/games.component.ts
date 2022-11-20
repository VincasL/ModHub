import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Game, Mod } from '../../services/rest/models';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import { GamesRestService } from '../../services/rest/games-rest.service';
import { ToastService } from '../../modules/toaster/services/toast.service';
import { ActionType } from 'src/app/shared/enums';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  ActionType = ActionType;
  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  private refreshGamesSubject = new BehaviorSubject<void>(undefined);
  refreshGames$ = this.refreshGamesSubject.asObservable();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gamesRestService: GamesRestService,
    private readonly router: Router,
    private modalService: MdbModalService,
    private readonly toastService: ToastService
  ) {}

  games$: Observable<Game[]> = this.refreshGames$.pipe(
    switchMap(() => this.gamesRestService.getGames())
  );

  ngOnInit(): void {}

  onActionClick(game: Game, actionType: ActionType) {
    switch (actionType) {
      case ActionType.View:
        this.router.navigate(['game', game.id]);
        break;
      case ActionType.Edit:
        this.router.navigate(['games', 'edit', game.id]);
        break;
      case ActionType.Delete:
        this.openModal(game);
        break;
      default:
        break;
    }

    return false;
  }

  openModal(game: Game) {
    const title = `Are you sure you want to delete ${game.name}?`;
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title },
    });

    this.modalRef.onClose
      .pipe(
        map((result) => result.success),
        filter(Boolean),
        switchMap(() => this.gamesRestService.deleteGame(game)),
        tap(() => {
          this.refreshGamesSubject.next();
          this.toastService.showSuccessToast('Game deleted successfully');
        })
      )
      .subscribe();
  }

  onAddGameClick() {
    this.router.navigate(['games', 'add']);
  }
}
