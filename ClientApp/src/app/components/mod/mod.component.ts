import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, switchMap, tap} from 'rxjs';
import {Game, Mod} from '../../services/rest/models';
import { ActivatedRoute } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import {mod} from "ngx-bootstrap/chronos/utils";

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css'],
})
export class ModComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService
  ) {}

  private refreshModSubject = new BehaviorSubject<void>(undefined);
  refreshMod$ = this.refreshModSubject.asObservable();

  mod$: Observable<Mod> = combineLatest([this.route.params, this.refreshMod$]).pipe(
    map(([params]) => {
      return {
        gameId: params['gameId'] as number,
        modId: params['modId'] as number,
      };
    }),
    switchMap((params) =>
      this.modsRestService.getMod(params.gameId, params.modId)
    )
  );

  ngOnInit(): void {}

  onModRatingChange(rating: number) {
    this.mod$.pipe(switchMap((mod) => this.modsRestService.putModRating(mod.id, rating)))
      .pipe(tap(() => this.refreshModSubject.next()))
      .subscribe();
  }

  onDownloadClick() {

  }
}
