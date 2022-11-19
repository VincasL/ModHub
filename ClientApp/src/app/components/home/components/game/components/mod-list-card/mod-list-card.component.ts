import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mod } from '../../../../../../services/rest/models';

@Component({
  selector: 'app-mod-list-card',
  templateUrl: './mod-list-card.component.html',
  styleUrls: ['./mod-list-card.component.css'],
})
export class ModListCardComponent implements OnInit {
  @Input() mod!: Mod;
  @Output() modClick = new EventEmitter<Mod>();
  @Output() modRatingChange = new EventEmitter<{
    modId: number;
    rating: number;
  }>();
  constructor() {}

  ngOnInit(): void {}

  onModClick(mod: Mod) {
    this.modClick.emit(mod);
    return false;
  }

  onModRatingChange($event: number) {
    this.modRatingChange.emit({ rating: $event, modId: this.mod.id });
  }
}
