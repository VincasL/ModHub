import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
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
import { RatingsService } from '../../../../../../services/shared/ratings.service';

@Component({
  selector: 'app-mod-list',
  templateUrl: './mod-list.component.html',
  styleUrls: ['./mod-list.component.css'],
})
export class ModListComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService,
    private readonly router: Router,
    private readonly ratingsService: RatingsService
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
    this.ratingsService
      .onModRatingChange(event.modId, event.rating)
      .subscribe();
  }
}
