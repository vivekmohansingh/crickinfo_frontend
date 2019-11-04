import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPlayersComponent } from './team-list/team-players/team-players.component';
import {MatchComponent} from './match/match.component'
const routes: Routes = [
  {path : '' , component : TeamListComponent},
  {path : 'players' , component : TeamPlayersComponent},
  {path : 'matches' , component : MatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
