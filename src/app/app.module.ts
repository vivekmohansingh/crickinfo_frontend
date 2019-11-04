import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPlayersComponent } from './team-list/team-players/team-players.component';
import { PlayerDetailsComponent } from './team-list/team-players/player-details/player-details.component';
import { ScheduleMatchComponent } from './team-list/schedule-match/schedule-match.component';
import { HttpClientModule } from '@angular/common/http';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    TeamPlayersComponent,
    PlayerDetailsComponent,
    ScheduleMatchComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
