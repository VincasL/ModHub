import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/home/components/game/game.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModComponent } from './components/mod/mod.component';
import { LoginComponent } from './components/login/login.component';
import { UploadModComponent } from './components/upload-mod/upload-mod.component';
import { ModsComponent } from './components/mods/mods.component';
import { ModEditComponent } from './components/mods/components/mod-edit/mod-edit.component';
import { ModSubmissionsComponent } from './components/mod-submissions/mod-submissions.component';
import { RegisterComponent } from './components/register/register.component';
import { GamesComponent } from './components/games/games.component';
import { UsersComponent } from './components/users/users.component';
import { GameAddEditComponent } from './components/games/components/game-add-edit/game-add-edit.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/add', component: GameAddEditComponent },
  { path: 'games/edit/:gameId', component: GameAddEditComponent },
  { path: 'game/:gameId', component: GameComponent },
  { path: 'game/:gameId/mod/:modId', component: ModComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadModComponent },
  { path: 'mods', component: ModsComponent },
  { path: 'game/:gameId/mod/:modId/edit', component: UploadModComponent },
  { path: 'submissions', component: ModSubmissionsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },

];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
