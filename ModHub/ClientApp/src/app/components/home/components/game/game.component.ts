import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesRestService } from '../../../../services/rest/games-rest.service';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  share,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { ModsRestService } from '../../../../services/rest/mods-rest.service';
import { Game, Mod } from '../../../../services/rest/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly gamesRestService: GamesRestService
  ) {}

  game$: Observable<Game> = this.route.params.pipe(
    map((params) => params['gameId']),
    switchMap((gameId) => this.gamesRestService.getGame(gameId))
  );

  ngOnInit(): void {}
}
