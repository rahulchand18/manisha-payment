import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-season-points-table',
  templateUrl: './season-points-table.component.html',
  styleUrl: './season-points-table.component.scss',
})
export class SeasonPointsTableComponent {
  table: any;
  sortType = 'asc'

  constructor(
    private matchService: MatchService,
    public authService: AuthService
  ) {
    this.getPointsTable();
  }

  getPointsTable() {
    this.matchService.getSeasonPointsTable().subscribe({
      next: (res) => {
        this.table = res.data;
      },
    });
  }

  sortBy():void{
    if(this.sortType === 'asc'){
      this.table = this.table.sort((a:any,b:any)=> (a.total/a.matches)-(b.total/b.matches))
      this.sortType = 'desc'
    }
    else if(this.sortType === 'desc'){
      this.table = this.table.sort((a:any,b:any)=> (b.total/b.matches)-(a.total/a.matches))
      this.sortType = 'def'
    }
   else if(this.sortType === 'def'){
      this.table = this.table.sort((a:any,b:any)=> (b.total)-(a.total))
      this.sortType = 'asc'
    }
  }
}
