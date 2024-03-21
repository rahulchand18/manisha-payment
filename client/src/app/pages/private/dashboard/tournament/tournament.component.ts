import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
})
export class TournamentComponent {
  allSeries: any;
  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['tournamentId']) {
        // this.getTournamentByTournamentId(params['tournamentId']);
      }
    });
  }
  ngOnInit(): void {
    this.getAllSeries();
  }

  getAllSeries() {
    this.matchService.getAllSeries({ history: false }).subscribe({
      next: (res) => {
        this.allSeries = res.data;
      },
    });
  }

  goToPrediction(matchId: string, active: boolean) {
    if (active) {
      this.router.navigate([`/u/tournament/prediction`], {
        queryParams: { matchId },
      });
    } else {
      this.router.navigate([`/u/tournament/points-table`], {
        queryParams: { matchId },
      });
    }
  }
}
