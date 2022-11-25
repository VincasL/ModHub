import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../../../../../services/rest/models';

@Component({
  selector: 'app-game-grid-card',
  templateUrl: './game-grid-card.component.html',
  styleUrls: ['./game-grid-card.component.css'],
})
export class GameGridCard implements OnInit {
  @Input() game!: Game;
  @Output() gameClick = new EventEmitter<Game>();
  constructor() {}

  ngOnInit(): void {}
}
