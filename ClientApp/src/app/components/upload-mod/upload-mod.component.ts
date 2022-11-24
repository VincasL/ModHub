import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import { GamesRestService } from '../../services/rest/games-rest.service';
import {
  filter,
  first,
  map,
  Observable,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { SelectOption } from '../../shared/interfaces';
import { Game, Mod } from '../../services/rest/models';
import { ToastService } from '../../modules/toaster/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ImagesRestService } from '../../services/rest/images-rest.service';

@Component({
  selector: 'app-upload-mod',
  templateUrl: './upload-mod.component.html',
  styleUrls: ['./upload-mod.component.css'],
})
export class UploadModComponent implements OnInit {
  form = this.fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    imageUrl: new FormControl<string>(''),
    description: new FormControl<string>(''),
    downloadLink: new FormControl(''),
    gameId: new FormControl<number | null>(null, Validators.required),
  });

  routeParams$ = this.route.params.pipe(
    map((params) => {
      return {
        gameId: params['gameId'] as number | null,
        modId: params['modId'] as number | null,
      };
    })
  );

  modId$ = this.route.params.pipe(
    map((params) => params['modId'] as number | null)
  );

  isAdd$ = this.modId$.pipe(map((value) => !value));

  mod$: Observable<Mod> = this.routeParams$.pipe(
    filter((params) => !!params.modId && !!params.gameId),
    switchMap((params) =>
      this.modsRestService.getMod(params.gameId!, params.modId!)
    ),
    first(),
    tap((mod) => this.form.patchValue(mod))
  );

  dropdownOptions$: Observable<SelectOption[]> = this.gamesRestService
    .getGames()
    .pipe(
      map((games) =>
        games.map((game) => {
          return { id: game.id, description: game.name };
        })
      )
    );

  constructor(
    private readonly fb: FormBuilder,
    private readonly modsRestService: ModsRestService,
    private readonly gamesRestService: GamesRestService,
    private readonly toastService: ToastService,
    private readonly router: Router,
    private readonly imagesRestService: ImagesRestService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAdd$.pipe(
      map((value: boolean) => !value),
      filter(Boolean),
      tap(() => {
        // @ts-ignore
        this.form.removeControl('gameId');
        // @ts-ignore
        this.form.removeControl('downloadLink');
      })
    );
    this.mod$.subscribe();
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value as unknown as Mod;

    formValue.gameId = formValue.gameId ? (formValue.gameId as any).id : undefined

    this.routeParams$
      .pipe(
        first(),
        withLatestFrom(this.isAdd$),
        switchMap(([params, isAdd]) =>
          isAdd
            ? this.modsRestService.postMod(formValue.gameId, formValue)
            : this.modsRestService.putMod(
                params.gameId!,
                params.modId!,
                formValue
              )
        ),
        switchMap(() => this.isAdd$),
        tap((isAdd) =>
          this.toastService.showSuccessToast(
            isAdd ? 'Mod uploaded successfully' : 'Mod saved successfully'
          )
        ),
        tap(() => this.router.navigate(['mods']))
      )
      .subscribe();
  }

  files: File[] = [];

  onSelect(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    this.files.push(file);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const imageBase64 = fileReader.result?.toString().split(',')[1];

      if (!imageBase64) {
        return;
      }

      this.imagesRestService
        .postImage(imageBase64)
        .pipe(
          first(),
          tap((imageGetDto) =>
            this.form.get('imageUrl')?.setValue(imageGetDto.imageUrl)
          )
        )
        .subscribe();
    };
    fileReader.readAsDataURL(file);
  }

  onRemove(event: File) {
    this.form.get('imageUrl')?.reset();
    this.files.splice(this.files.indexOf(event), 1);
  }
}
