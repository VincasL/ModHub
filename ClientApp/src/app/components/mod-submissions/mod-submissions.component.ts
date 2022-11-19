import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Mod } from '../../services/rest/models';
import { SubmissionActionType } from '../../shared/enums';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GamesRestService } from '../../services/rest/games-rest.service';
import { ModPreviewModalComponent } from './components/mod-preview-modal/mod-preview-modal.component';
import { ModStatus } from '../../shared/enums/mod-status';

@Component({
  selector: 'app-mod-submissions',
  templateUrl: './mod-submissions.component.html',
  styleUrls: ['./mod-submissions.component.css'],
})
export class ModSubmissionsComponent implements OnInit {
  ActionType = SubmissionActionType;
  confirmModalRef: MdbModalRef<ConfirmModalComponent> | null = null;
  modPreviewModalRef: MdbModalRef<ModPreviewModalComponent> | null = null;

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
    switchMap(() => this.modsRestService.getWaitingForApprovalMods())
  );

  ngOnInit(): void {}

  onActionClick(mod: Mod, actionType: SubmissionActionType) {
    switch (actionType) {
      case SubmissionActionType.View:
        this.openGamePreviewModal(mod);
        break;
      case SubmissionActionType.Approve:
      case SubmissionActionType.Decline:
        this.openModal(mod, actionType === SubmissionActionType.Approve);
        break;
      default:
        break;
    }

    return false;
  }

  openModal(mod: Mod, isApprove: boolean = true) {
    const title = `Are you sure you want to ${
      isApprove ? 'approve' : 'decline'
    } ${mod.name}?`;

    const saveButtonText = isApprove ? 'Approve' : 'Decline';

    this.confirmModalRef = this.modalService.open(ConfirmModalComponent, {
      data: { title, saveButtonText, isSuccess: isApprove },
    });

    this.confirmModalRef.onClose
      .pipe(
        map((result) => result.success),
        filter(Boolean),
        switchMap(() =>
          this.modsRestService.putModStatus(
            mod.gameId,
            mod.id,
            isApprove ? ModStatus.Approved : ModStatus.Declined
          )
        ),
        tap(() => this.refreshModsSubject.next())
      )
      .subscribe();
  }

  openGamePreviewModal(mod: Mod) {
    this.modPreviewModalRef = this.modalService.open(ModPreviewModalComponent, {
      modalClass: 'modal-lg',
      ignoreBackdropClick: true,
      backdrop: true,
      data: { mod },
    });
  }
}
