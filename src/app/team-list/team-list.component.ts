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
  @ViewChild('team1') team1 : ElementRef;
  @ViewChild('team2') team2 : ElementRef;
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
    team1_id : this.team1.nativeElement.value.trim(),
    team2_id : this.team2.nativeElement.value.trim(),
    result : 0,
    schedule_time : this.date.nativeElement.value.trim()
  }
  
  this._http.post('http://localhost:4200/api/match',payload,httpOptions).subscribe(response => {
    alert("Match Scheduled Successfully");
    this.scheduleMatch = false;
  },
  error => {
      if(error['status'] == 400){
        alert("Match already scheduled between these teams on "+this.date.nativeElement.value.trim());
      }
  })
 }
}
