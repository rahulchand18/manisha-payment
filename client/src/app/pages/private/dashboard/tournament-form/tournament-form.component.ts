import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatchService } from 'src/app/core/services/match.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrl: './tournament-form.component.scss',
})
export class TournamentFormComponent {
  tournamentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<DashboardComponent>
  ) {
    this.createForm();
  }

  createForm() {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      tournamentId: ['', Validators.required],
      tournamentAdmin: [this.authService.getUserData().email],
    });
  }

  submitForm({ valid, value }: FormGroup) {
    if (valid) {
      this.matchService.createTournament(value).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
        },
      });
    }
  }
}
