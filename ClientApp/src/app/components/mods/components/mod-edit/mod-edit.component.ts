import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first, map, Observable, switchMap, tap } from 'rxjs';
import { ModsRestService } from '../../../../services/rest/mods-rest.service';
import { Game, Mod } from '../../../../services/rest/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../../../modules/toaster/services/toast.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.css'],
})
export class ModEditComponent implements OnInit {
  editModForm = this.fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    imageUrl: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly modsRestService: ModsRestService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private location: Location,
    private readonly toastService: ToastService
  ) {}

  routeParams$ = this.route.params.pipe(
    map((params) => {
      return {
        gameId: params['gameId'] as number,
        modId: params['modId'] as number,
      };
    })
  );

  mod$: Observable<Game> = this.routeParams$.pipe(
    switchMap((params) =>
      this.modsRestService.getMod(params.gameId, params.modId)
    ),
    first(),
    tap((mod) => this.editModForm.patchValue(mod))
  );

  ngOnInit(): void {
    this.mod$.subscribe();
  }

  onSubmit() {
    this.editModForm.markAllAsTouched();

    if (this.editModForm.invalid) {
      return;
    }

    const formValue = this.editModForm.value as unknown as Mod;

    this.routeParams$
      .pipe(
        first(),
        switchMap((params) =>
          this.modsRestService.putMod(params.gameId, params.modId, formValue)
        ),
        tap(() =>
          this.toastService.showSuccessToast('Mod saved successfully')
        ),
        tap(() => this.location.back())
      )
      .subscribe();
  }
}
