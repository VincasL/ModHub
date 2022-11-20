import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../../../modules/toaster/services/toast.service';
import {
  filter,
  first,
  map,
  Observable,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Game } from '../../../../services/rest/models';
import { GamesRestService } from '../../../../services/rest/games-rest.service';

@Component({
  selector: 'app-game-add-edit',
  templateUrl: './game-add-edit.component.html',
  styleUrls: ['./game-add-edit.component.css'],
})
export class GameAddEditComponent implements OnInit {
  form = this.fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(50),
    ]),
    imageUrl: new FormControl<string>('', Validators.required),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly gamesRestService: GamesRestService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private location: Location,
    private readonly toastService: ToastService
  ) {}

  gameId$ = this.route.params.pipe(
    map((params) => params['gameId'] as number | null)
  );

  game$: Observable<Game> = this.gameId$.pipe(
    filter(Boolean),
    first(),
    switchMap((gameId) => this.gamesRestService.getGame(gameId)),
    tap((game) => this.form.patchValue(game))
  );

  isAdd$ = this.gameId$.pipe(map((value) => !value));

  ngOnInit(): void {
    this.game$.subscribe();
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value as unknown as Game;

    this.gameId$
      .pipe(
        first(),
        withLatestFrom(this.isAdd$),
        switchMap(([gameId, isAdd]) =>
          isAdd
            ? this.gamesRestService.postGame(formValue)
            : this.gamesRestService.putGame(gameId!, formValue)
        ),
        tap(() => this.toastService.showSuccessToast('Game saved successfully')),
        tap(() => this.location.back())
      )
      .subscribe();
  }
}
