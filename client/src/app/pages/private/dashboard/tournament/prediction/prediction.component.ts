import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss',
})
export class PredictionComponent implements OnInit {
  matchId!: string;
  prediction: any;
  predictionForm: any;
  teams: any;
  match: any;
  players: any;
  constructor(
    private matchService: MatchService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['matchId']) {
        this.matchId = params['matchId'];
        this.getPlayers(this.matchId);
        this.createPredictionForm();
        this.getPrediction();
      }
    });
  }

  ngOnInit(): void {}

  getPrediction() {
    this.matchService
      .getPrediction(this.matchId, this.authService.getUserData().email)
      .subscribe({
        next: (res) => {
          this.prediction = res.data;
          this.patchPredictionForm(this.prediction);
        },
        error: (err) => {
          this.prediction = null;
        },
      });
  }
  getMatchByMatchId(){
    this.matchService.getMatchByMatchId(this.matchId).subscribe((response)=>{
       this.match = response.data
     })
  }
  createPredictionForm() {
    this.predictionForm = this.fb.group({
      matchId: [this.matchId],
      email: [this.authService.getUserData().email],
      tossWinner: ['', Validators.required],
      matchWinner: ['', Validators.required],
      manOfTheMatch: ['', Validators.required],
      mostCatches: ['', Validators.required],
      mostRuns: ['', Validators.required],
      mostWickets: ['', Validators.required],
      mostSixes: ['', Validators.required],
    });
  }

  patchPredictionForm(prediction: any) {
    this.predictionForm.patchValue({
      matchId: [this.matchId],
      email: [this.authService.getUserData().email],
      tossWinner: prediction.tossWinner,
      matchWinner: prediction.matchWinner,
      manOfTheMatch: prediction.manOfTheMatch,
      mostCatches: prediction.mostCatches,
      mostRuns: prediction.mostRuns,
      mostWickets: prediction.mostWickets,
      mostSixes: prediction.mostSixes,
    });
  }

  getPlayers(matchId: string) {
    this.matchService.getPlayers(matchId).subscribe((res) => {
      this.teams = res.data;
      this.players = [...this.teams[0].players, ...this.teams[1].players];
    });
  }

  savePrediction({ valid, value }: FormGroup) {
    if (valid) {
      if (!this.prediction) {
        this.matchService.createPrediction(value).subscribe({
          next: (res) => {
            this.snackbar.open('Prediction Added Successfully', 'Close');
            this.getPrediction();
          },
          error: (err) => {
            this.snackbar.open(err.message, 'Close');
          },
        });
      } else {
        this.matchService.updatePrediction(value).subscribe({
          next: (res) => {
            this.snackbar.open('Prediction Updated Successfully', 'Close');
            this.getPrediction();
          },
          error: (err) => {
            this.snackbar.open(err.message, 'Close');
          },
        });
      }
    }
  }
}
