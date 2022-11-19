import { Component, OnInit } from '@angular/core';
import { GamesRestService } from '../../../../services/rest/games-rest.service';
import { Router } from '@angular/router';
import { Game } from '../../../../services/rest/models';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css'],
})
export class GameGrid implements OnInit {
  games$ = this.gamesRestService.getGames();

  constructor(
    private readonly gamesRestService: GamesRestService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.games$.subscribe();
  }

  onGameClick(game: Game) {
    this.router.navigate(['game', game.id]);
  }
}
