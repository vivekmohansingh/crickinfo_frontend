import { Injectable,Output, EventEmitter } from '@angular/core';

//import {Subject} from rxjs;
@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  constructor() { }
  teams ;
  team_id;
  is_fixture;
  player_id;
//  player_detail;
  // objSubject = new Subject<any>();
  player_detail = new EventEmitter<any>();
  setPlayerDetail(details){
    this.player_detail.emit(details);
  }
  // // Object1 = new Subject<any>();
  // Object1.next(player_detail);
}
