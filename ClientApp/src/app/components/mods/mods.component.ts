import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import { BehaviorSubject, filter, Observable, switchMap, tap } from 'rxjs';
import { Mod } from '../../services/rest/models';
import { ActionType } from '../../shared/enums';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GamesRestService } from '../../services/rest/games-rest.service';
import { modStatusToDescription } from 'src/app/shared/enums/mod-status';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.css'],
})
export class ModsComponent implements OnInit {
  ActionType = ActionType;
  modStatusToDescription = modStatusToDescription;
  modalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  private refreshModsSubject = new BehaviorSubject<void>(undefined);
  refreshMods$ = this.refreshModsSubject.asObservable();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService,
    private readonly gamesRestService: GamesRestService,
    private readonly router: Router,
    private modalService: MdbModalService
  ) {}

  mods$: Observable<Mod[]> = this.refreshMods$.pipe(
    switchMap(() => this.modsRestService.getUserMods())
  );

  games$ = this.gamesRestService.getGames();

  ngOnInit(): void {}

  onModClick(mod: Mod) {}

  onEditClick() {
    console.log('edit');
  }

  onDeleteClick() {
    console.log('delete');
  }

  onActionClick(mod: Mod, actionType: ActionType) {
    switch (actionType) {
      case ActionType.View:
        this.router.navigate(['game', mod.gameId, 'mod', mod.id]);
        break;
      case ActionType.Edit:
        this.router.navigate(['game', mod.gameId, 'mod', mod.id, 'edit']);
        break;
      case ActionType.Delete:
        this.openModal(mod);
        break;
      default:
        break;
    }

    return false;
  }

  openModal(mod: Mod) {
    this.modalRef = this.modalService.open(ConfirmModalComponent);

    this.modalRef.onClose
      .pipe(
        filter(Boolean),
        switchMap(() => this.modsRestService.deleteMod(mod)),
        tap(() => this.refreshModsSubject.next())
      )
      .subscribe();
  }
}
