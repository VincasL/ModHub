import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { GameGrid } from './components/home/components/games/game-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GameGridCard } from './components/home/components/games/components/game-card/game-grid-card.component';
import { GameComponent } from './components/home/components/game/game.component';
import { ModListCardComponent } from './components/home/components/game/components/mod-list-card/mod-list-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GameCardComponent } from './components/home/components/game/components/game-card/game-card.component';
import { ModListComponent } from './components/home/components/game/components/mod-list/mod-list.component';
import { ModComponent } from './components/mod/mod.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameGrid,
    GameGridCard,
    GameComponent,
    GameCardComponent,
    ModListComponent,
    ModListCardComponent,
    NotFoundComponent,
    ModComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgxNavbarModule,
    CollapseModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
