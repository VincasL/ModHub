import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../../../services/rest/models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() game!: Game;
  constructor() {}

  ngOnInit(): void {}
}
