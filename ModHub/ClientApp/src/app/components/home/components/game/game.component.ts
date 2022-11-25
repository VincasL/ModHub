import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesRestService } from '../../../../services/rest/games-rest.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Game } from '../../../../services/rest/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  isGameLoading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gamesRestService: GamesRestService
  ) {}

  game$: Observable<Game> = this.route.params.pipe(
    tap(() => (this.isGameLoading = true)),
    map((params) => params['gameId']),
    switchMap((gameId) => this.gamesRestService.getGame(gameId)),
    tap(() => (this.isGameLoading = false))
  );

  ngOnInit(): void {}
}
