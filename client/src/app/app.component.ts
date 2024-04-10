import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { MatchService } from './core/services/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IPL Prediction';
  currentUser: any;
  balance: any;

  constructor(
    public authService: AuthService,
    private matchService: MatchService
  ) {
    this.currentUser = authService.getUserData();
    if (this.currentUser) {
      console.log(this.currentUser);
      this.getBalanceById(this.currentUser.email);
    }
  }
  getBalanceById(email?: string) {
    this.matchService
      .getBalanceById(email ?? this.currentUser.email)
      .subscribe((res) => {
        this.balance = res.data.balance;
      });
  }

  logout() {
    this.authService.logout();
    this.authService.navigateToLogin();
  }
}
