import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/home/components/game/game.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModComponent } from './components/mod/mod.component'; // CLI imports router

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'game/:gameId', component: GameComponent },
  { path: 'game/:gameId/mod/:modId', component: ModComponent },
  { path: '**', component: NotFoundComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
