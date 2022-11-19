import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Mod } from '../../../../services/rest/models';

@Component({
  selector: 'app-mod-list-dashboard-item',
  templateUrl: './mod-list-dashboard-item.component.html',
  styleUrls: ['./mod-list-dashboard-item.component.css'],
})
export class ModListDashboardItemComponent implements OnInit {
  @Input() mod!: Mod;
  @Output() onEditClick = new EventEmitter<Mod>();
  @Output() onDeleteClick = new EventEmitter<Mod>();

  constructor() {}

  ngOnInit(): void {}
}
