import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Mod } from '../../../../../../services/rest/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ModsRestService } from '../../../../../../services/rest/mods-rest.service';

@Component({
  selector: 'app-mod-list',
  templateUrl: './mod-list.component.html',
  styleUrls: ['./mod-list.component.css'],
})
export class ModListComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly modsRestService: ModsRestService,
    private readonly router: Router
  ) {}

  mods$: Observable<Mod[]> = this.route.params.pipe(
    map((params) => params['gameId']),
    switchMap((gameId) => this.modsRestService.getMods(gameId))
  );

  ngOnInit(): void {}

  onModClick(mod: Mod) {
    this.router.navigate(['mod', mod.id], { relativeTo: this.route });
  }
}
