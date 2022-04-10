import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MaterialModule } from '@acc/material';
import { GameShellComponent } from './game-shell/game-shell.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GamesComponent } from './games/games.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnResultComponent } from './turn-result/turn-result.component';
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    GameShellComponent,
    GameSetupComponent,
    GamePlayComponent,
    GamesComponent,
    TurnResultComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
