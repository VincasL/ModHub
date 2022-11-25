import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Mod } from '../../services/rest/models';
import { ActivatedRoute } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import { RatingsService } from '../../services/shared/ratings.service';
import { ModStatus } from '../../shared/enums/mod-status';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css'],
})
export class ModComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService,
    private readonly ratingsService: RatingsService
  ) {}
  ModStatus = ModStatus;

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
    tap(() => (this.isModLoading = true)),
    switchMap(([params]) =>
      this.modsRestService.getMod(params.gameId, params.modId)
    ),
    tap(() => (this.isModLoading = false))
  );
  isModLoading = false;

  ngOnInit(): void {}

  onModRatingChange(rating: number) {
    this.mod$
      .pipe(
        first(),
        switchMap((mod) =>
          this.ratingsService.onModRatingChange(mod.id, rating)
        ),
        filter(Boolean),
        tap(() => this.refreshModSubject.next())
      )
      .subscribe();
  }

  onDownloadClick() {
    this.mod$
      .pipe(
        first(),
        tap((mod) => this.saveData({ mod }, `${mod.name}.json`))
      )
      .subscribe();

    this.routeParams$
      .pipe(
        first(),
        switchMap((params) =>
          this.modsRestService.downloadMod(params.gameId, params.modId)
        ),
        tap(() => this.refreshModSubject.next())
      )
      .subscribe();
  }

  saveData(data: any, fileName: any) {
    let a = document.createElement('a');
    document.body.appendChild(a);
    // @ts-ignore
    a['style'] = 'display: none';

    var json = JSON.stringify(data),
      blob = new Blob([json], { type: 'octet/stream' }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
