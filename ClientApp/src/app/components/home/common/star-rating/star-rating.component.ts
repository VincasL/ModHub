import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mod } from '../../../../services/rest/models';
import { mod } from 'ngx-bootstrap/chronos/utils';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  currentRating: number | null = null;
  @Input() mod!: Mod;
  @Output() onValueChange = new EventEmitter<number>();
  numbers: number[] = [5, 4, 3, 2, 1] as number[];

  constructor() {}

  ngOnInit(): void {
    this.currentRating = this.mod.currentUserRating;
  }

  onClick(number: number) {
    this.currentRating = number;
    this.onValueChange.emit(number);
  }
}
