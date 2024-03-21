import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.createFormGroup();
  }

  createFormGroup() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register({ valid, value }: FormGroup) {
    if (valid) {
      if (value.password !== value.confirmPassword) {
        this.registerForm.controls['confirmPassword'].setErrors({
          passwordNotMatch: true,
        });
        return;
      }
      this.authService.register(value).subscribe({
        next: (res) => {
          this.router.navigate(['']);
          this.snackbar.open(res.message, 'Close');
        },
        error: (err) => {
          this.snackbar.open(err.message, 'Close');
        },
      });
    }
  }
}
