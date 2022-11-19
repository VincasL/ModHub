import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  first,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Mod } from '../../services/rest/models';
import { ActivatedRoute } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';

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

  routeParams$ = this.route.params.pipe(
    map((params) => {
      return {
        gameId: params['gameId'] as number,
        modId: params['modId'] as number,
      };
    })
  );

  mod$: Observable<Mod> = combineLatest([
    this.routeParams$,
    this.refreshMod$,
  ]).pipe(
    switchMap(([params]) =>
      this.modsRestService.getMod(params.gameId, params.modId)
    )
  );

  ngOnInit(): void {}

  onModRatingChange(rating: number) {
    this.mod$
      .pipe(
        first(),
        switchMap((mod) => this.modsRestService.putModRating(mod.id, rating)),
        tap(() => this.refreshModSubject.next())
      )
      .subscribe();
  }

  onDownloadClick() {}
}
