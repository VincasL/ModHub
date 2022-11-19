import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/home/components/game/game.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModComponent } from './components/mod/mod.component';
import { LoginComponent } from './components/login/login.component';
import { UploadModComponent } from './components/upload-mod/upload-mod.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'game/:gameId', component: GameComponent },
  { path: 'game/:gameId/mod/:modId', component: ModComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadModComponent },
  { path: '**', component: NotFoundComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
