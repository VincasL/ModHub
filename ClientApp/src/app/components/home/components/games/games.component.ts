import { Component, OnInit } from '@angular/core';
import { GamesRestService } from '../../../../services/rest/games-rest.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games$ = this.gamesRestService.getGames();

  constructor(private readonly gamesRestService: GamesRestService) {}

  ngOnInit(): void {
    this.games$.subscribe();
  }
}
