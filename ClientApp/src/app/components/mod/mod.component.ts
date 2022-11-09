import { Component, OnInit } from '@angular/core';
import {map, Observable, switchMap, tap} from 'rxjs';
import { Game } from '../../services/rest/models';
import { ActivatedRoute } from '@angular/router';
import { ModsRestService } from '../../services/rest/mods-rest.service';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css'],
})
export class ModComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService
  ) {}

  mod$: Observable<Game> = this.route.params.pipe(
    map((params) => {
      return {
        gameId: params['gameId'] as number,
        modId: params['modId'] as number,
      };
    }),
    switchMap((params) =>
      this.modsRestService.getMod(params.gameId, params.modId)
    )
  );

  ngOnInit(): void {}
}
