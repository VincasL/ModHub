import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { GameGrid } from './components/home/components/games/game-grid.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { UploadModComponent } from './components/upload-mod/upload-mod.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ModsComponent } from './components/mods/mods.component';
import { ModListDashboardItemComponent } from './components/mods/components/mod-list-dashboard-item/mod-list-dashboard-item.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ModEditComponent } from './components/mods/components/mod-edit/mod-edit.component';
import { ToastComponent } from './modules/toaster/components/toast/toast.component';
import { ToasterComponent } from './modules/toaster/toaster.component';
import { ModSubmissionsComponent } from './components/mod-submissions/mod-submissions.component';
import { ModPreviewModalComponent } from './components/mod-submissions/components/mod-preview-modal/mod-preview-modal.component';
import { StarRatingComponent } from './components/home/common/star-rating/star-rating.component';

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
    UploadModComponent,
    ModsComponent,
    ModListDashboardItemComponent,
    ConfirmModalComponent,
    ModEditComponent,
    ToasterComponent,
    ToastComponent,
    ModSubmissionsComponent,
    ModPreviewModalComponent,
    StarRatingComponent
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
    NgxDropzoneModule,
    SelectDropDownModule,
    MdbModalModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
