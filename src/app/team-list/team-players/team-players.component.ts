import { Component, OnInit } from '@angular/core';
import { Player } from '../players';
import { PlayerDetail } from '../players';
import { HttpParams, HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {TeamServiceService} from "../../team-service.service";
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';
@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  players = [];
  player_details = [];
  team_name = '';
  //let PlayerDetail_component: PlayerDetailsComponent;
  constructor(private _http : HttpClient , private teamService : TeamServiceService , private router : Router) { }

  ngOnInit() {
   const httpOptions = {
    headers: new HttpHeaders({
      'access_token': environment.accesstoken
    })
  }; 

    if(!this.teamService.team_id)
    {
      alert("Kindly choose any APL team.");
      this.router.navigate(['/']);
    }
    this._http.get('http://localhost:4200/api/team/'+this.teamService.team_id,httpOptions).subscribe(response => {
    console.log(response[0].name);
    this.team_name = response[0].name;
      for(let response_data of response[0].get_players)
       {
          let new_Player = new Player;
          new_Player.playerId = response_data.id;
          new_Player.firstName = response_data.f_name;
          new_Player.secondName = response_data.l_name;
          new_Player.country = response_data.country;
          new_Player.imageURL = '/assets/images/'+response_data.imageuri;
          new_Player.jersey_number = response_data.jersey_number;
          this.players.push(new_Player);
       }

    },
    error => {
      console.log(error);
    })
  }
  onClick(index){
   const httpOptions = {
    headers: new HttpHeaders({
      'access_token': environment.accesstoken
    })
  };  
    this.teamService.player_id = index;
    this._http.get('http://localhost:4200/api/player/'+index+'/history',httpOptions).subscribe(response => {
      let player_detail = new PlayerDetail;
      player_detail.firstName = response[0].f_name;
      player_detail.secondName = response[0].l_name;
      player_detail.total_match = response[0].player_Summary.total_match;
      player_detail.total_run = response[0].player_Summary.total_run;
      player_detail.total_fifty = response[0].player_Summary.total_fifty;
      player_detail.total_hundrad = response[0].player_Summary.total_hundrad;
      player_detail.hscore = response[0].player_Summary.hscore;
      //this.teamService.player_detail = player_detail;
      this.teamService.setPlayerDetail(player_detail);
      //console.log(this.teamService.player_detail);
      /*for(let response_data of response[0].get_players)
       {
         console.log(response_data);
        let new_Player = new Player;
         new_Player.playerId = response_data.id;
        new_Player.firstName = response_data.f_name;
        new_Player.secondName = response_data.l_name;
        new_Player.imageURL = response_data.imageuri;
        new_Player.jersey_number = response_data.jersey_number;
        this.players.push(new_Player);
       }
      */
    },
    error => {
      console.log(error);
    })

  }

}
