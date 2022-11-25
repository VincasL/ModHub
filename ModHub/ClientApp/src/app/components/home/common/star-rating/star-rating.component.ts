import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Mod } from '../../../../services/rest/models';
import { mod } from 'ngx-bootstrap/chronos/utils';
import {AuthService} from "../../../../services/shared/auth.service";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit, OnChanges {
  currentRating: number | null = null;
  @Input() mod!: Mod;
  @Output() onValueChange = new EventEmitter<number>();
  numbers: number[] = [5, 4, 3, 2, 1] as number[];

  constructor() {}

  ngOnInit(): void {
    this.currentRating = this.mod.currentUserRating;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentRating = changes["mod"].currentValue.currentUserRating;
  }

  onClick(number: number) {
    this.onValueChange.emit(number);
    return false;
  }
}
