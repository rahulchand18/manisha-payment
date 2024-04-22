import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  users:any  = [];

  constructor(private matchService:MatchService){}

  ngOnInit(){
    this.matchService.getSummary().subscribe(res=>{
      this.users = res.data
    })
  }

}
