import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  userData!: any;
  invalidData = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login({ valid, value }: FormGroup): void {
    this.submitted = true;
    if (!valid) {
      return;
    }
    this.loading = true;
    this.authService.login(value).subscribe({
      next: (res: any) => {
        this.invalidData = false;
        const { user, accessToken } = res;
        if (accessToken) {
          this.authService.setAccessToken(accessToken);
          const userData = {
            email: user.email,
            userType: user.userType,
            fullName: user.firstName + ' ' + user.lastName,
            img: user.img,
          };
          this.authService.setUserData(userData);
        }
        this.userData = this.authService.getUserData();
        const returnURL = this.activatedRoute.snapshot.queryParams['returnUrl'];
        if (returnURL) {
          this.router.navigateByUrl(decodeURIComponent(returnURL)).then(() => {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.invalidData = true;
      },
    });
  }
}
