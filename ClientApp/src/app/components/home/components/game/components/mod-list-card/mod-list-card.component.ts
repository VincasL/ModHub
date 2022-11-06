import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Game, Mod} from '../../../../../../services/rest/models';

@Component({
  selector: 'app-mod-list-card',
  templateUrl: './mod-list-card.component.html',
  styleUrls: ['./mod-list-card.component.css'],
})
export class ModListCardComponent implements OnInit {
  @Input() mod!: Mod;
  @Output() modClick = new EventEmitter<Mod>();
  constructor() {}

  ngOnInit(): void {}

  onModClick(mod: Mod){
    this.modClick.emit(mod);
    return false;
  }
}
