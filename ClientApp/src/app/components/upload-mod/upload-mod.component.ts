import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModsRestService } from '../../services/rest/mods-rest.service';
import { GamesRestService } from '../../services/rest/games-rest.service';
import { map, Observable, tap } from 'rxjs';
import { SelectOption } from '../../shared/interfaces';
import { Mod } from '../../services/rest/models';
import { ToastService } from '../../modules/toaster/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-mod',
  templateUrl: './upload-mod.component.html',
  styleUrls: ['./upload-mod.component.css'],
})
export class UploadModComponent implements OnInit {
  uploadModForm = this.fb.group({
    name: new FormControl(null, Validators.required),
    imageUrl: new FormControl(null),
    description: new FormControl(''),
    downloadLink: new FormControl(''),
    gameId: new FormControl(null, Validators.required),
  });

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
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.uploadModForm.markAllAsTouched();

    if (this.uploadModForm.invalid) {
      return;
    }

    const formValue = this.uploadModForm.value;
    formValue.gameId = (formValue.gameId as any).id;

    this.modsRestService
      .postMod(formValue.gameId!, formValue as unknown as Mod)
      .pipe(
        tap(() =>
          this.toastService.showSuccessToast('Mod uploaded successfully')
        ),
        tap(() => this.router.navigate(['mods']))
      )
      .subscribe();
  }
}