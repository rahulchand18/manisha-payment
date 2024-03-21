import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-private',
  template: '<router-outlet></router-outlet>',
})
export class PrivateComponent {
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  listenLogoutStatus(): void {
    this.authService.logOutStatus.subscribe(() => {
      this.isLoggedIn = false;
    });
    this.listenLogoutStatus();
  }
}
