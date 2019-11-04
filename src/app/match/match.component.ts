import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {TeamServiceService} from "../team-service.service";
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(private _http : HttpClient , private teamService : TeamServiceService , private router : Router) { }
  matches;
  is_fixture = this.teamService.is_fixture;

  ngOnInit() {
  const httpOptions = {
    headers: new HttpHeaders({
      'access_token': environment.accesstoken
    })
  };  
    if(!this.teamService.team_id)
    {
      this.router.navigate(['/']);
    }
    let type = '/match';
    if(this.teamService.is_fixture)
      type = '/fixture';

     this._http.get('http://localhost:4200/api/team/'+this.teamService.team_id+type,httpOptions).subscribe(response => {
      this.matches = response;
      console.log(this.matches);
    //   let player_detail = new PlayerDetail;
    //   player_detail.firstName = response[0].f_name;
    //   player_detail.secondName = response[0].l_name;
    //   player_detail.total_match = response[0].player_Summary.total_match;
    //   player_detail.total_run = response[0].player_Summary.total_run;
    //   player_detail.total_sixes = response[0].player_Summary.total_six;
    //   //this.teamService.player_detail = player_detail;
    //   this.teamService.setPlayerDetail(player_detail);
  });

}

}
