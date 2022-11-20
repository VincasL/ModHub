import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import {
  BehaviorSubject,
  filter,
  map,
  mapTo,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Mod } from '../../services/rest/models';
import { ActionType } from '../../shared/enums';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GamesRestService } from '../../services/rest/games-rest.service';
import { modStatusToDescription } from 'src/app/shared/enums/mod-status';
import { ToastService } from '../../modules/toaster/services/toast.service';

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
    private modalService: MdbModalService,
    private readonly toastService: ToastService
  ) {}

  mods$: Observable<Mod[]> = this.refreshMods$.pipe(
    switchMap(() => this.modsRestService.getUserMods())
  );

  ngOnInit(): void {}

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
    const title = `Are you sure you want to delete ${mod.name}?`;
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title },
    });

    this.modalRef.onClose
      .pipe(
        map((result) => result.success),
        filter(Boolean),
        switchMap(() => this.modsRestService.deleteMod(mod)),
        tap(() => {
          this.refreshModsSubject.next();
          this.toastService.showSuccessToast('Mod deleted successfully');
        })
      )
      .subscribe();
  }
}
