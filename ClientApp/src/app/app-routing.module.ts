import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // CLI imports router

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
