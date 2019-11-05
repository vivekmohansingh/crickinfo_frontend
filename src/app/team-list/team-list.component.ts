import { Component, OnInit , ViewChild , ElementRef} from '@angular/core';
import { Team } from '../team';
import { HttpParams, HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { template } from '@angular/core/src/render3';
import {TeamServiceService} from '../team-service.service'
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})

export class TeamListComponent implements OnInit {

  teams : Team[] = [];
  arr;
  scheduleMatch = false;
  team1 = '1';
  team2 = '2';
  @ViewChild('date') date : ElementRef;
  constructor(private _http : HttpClient , private teamService : TeamServiceService , private router : Router) { }

  ngOnInit() {
  const httpOptions = {
    headers: new HttpHeaders({
      'access_token': environment.accesstoken
    })
  };
    this._http.get('http://localhost:4200/api/team',httpOptions).subscribe(response => {
      //console.log(response);
      this.arr = response;
      for(let response_data of this.arr)
       {
          let new_team = new Team;
          new_team.teamId = response_data.id;
          new_team.teamName = response_data.name;
          new_team.club = response_data.club;
          new_team.teamLogo = '/assets/images/'+response_data.logo;
          this.teams.push(new_team);
       }
    },
    error => {
      console.log(error);
    })


  }
 onClick(index,rout,fixture){
   console.log(index);
   this.teamService.team_id = index;
   this.teamService.is_fixture = fixture;
   this.router.navigate([rout]);
 }

 scheduledMatch(){

  this.scheduleMatch = true;
 }

 schedule(){
   const httpOptions = {
    headers: new HttpHeaders({
      'access_token': environment.accesstoken
    })
  };
  let payload = {
    team1_id : this.team1.trim(),
    team2_id : this.team2.trim(),
    result : 0,
    schedule_time : this.date.nativeElement.value.trim()
  }
  
  this._http.post('http://localhost:4200/api/match',payload,httpOptions).subscribe(response => {
    alert("Match Scheduled Successfully");
    this.scheduleMatch = false;
  },
  error => {
     switch(error['status']){
       case 406 : alert("Team 1 and Team 2 cannot be same . Please select different teams");
                  break;
       case 400 : alert("Invalid Data");
                  break;
       case 404 : alert("Invalid Teams");
                  break;
       case 409 : alert("Match already scheduled between these teams on "+this.date.nativeElement.value.trim());
                  break;
     }
  })
 }
 selectTeamOne(event){
   this.team1 = event.target.value;
 }
 selectTeamTwo(event){
   this.team2 = event.target.value;
 }
}
