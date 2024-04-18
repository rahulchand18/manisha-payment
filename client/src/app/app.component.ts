import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { MatchService } from './core/services/match.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IPL Prediction';
  currentUser: any;
  balance: any;
  imageUrl!: string | null | undefined;
  photoChanged = false;
  imageFile!: File;
  showEditMenu = false;
  formData: FormData = new FormData();

  constructor(
    public authService: AuthService,
    private matchService: MatchService
  ) {
    this.currentUser = authService.getUserData();
    if (this.currentUser) {
      console.log(this.currentUser);
      if (this.currentUser.img) {
        this.imageUrl = authService.getProfileUrl(this.currentUser.img);
      }
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

  onFileChange(files: FileList | null) {
    if (!files || !files.length) {
      return;
    }
    const reader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = ({ target }: any) => {
      this.imageUrl = target.result;
    };
    if (files && files.length) {
      this.imageFile = files[0];
      reader.readAsDataURL(files[0]);
    }
    this.photoChanged = true;
    this.uploadProfileImage();
  }
  uploadProfileImage() {
    if (this.imageFile) {
      this.formData.delete('image');
      this.formData.append('image', this.imageFile, this.imageFile.name);
      console.log(this.formData);
      this.authService
        .uploadPhoto(this.currentUser.email, this.formData)
        .subscribe((res) => {
          console.log(res);
        });
      // this.fileService.uploadEmployeeImage(this.employeeId, this.formData).subscribe({
      //     next: (res) => {
      //         this.getEmployeeDetails(this.employeeId);
      //         this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, data: res });
      //     },
      //     error: (err) => {
      //         this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, data: err });
      //     }
      // });
    }
  }
  logout() {
    this.authService.logout();
    this.authService.navigateToLogin();
  }
}
