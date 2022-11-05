import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../../../services/rest/games-rest.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() game!: Game
  constructor() {}

  ngOnInit(): void {}
}
