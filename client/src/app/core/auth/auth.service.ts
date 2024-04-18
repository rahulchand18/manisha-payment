import { firstValueFrom, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { LOCAL_STORAGE_CONSTANT, URL_CONSTANT } from '../constants';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logOutSubject: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  getAccessToken(): string {
    return this.localStorageService.getLocalStorageData(
      LOCAL_STORAGE_CONSTANT.token
    );
  }

  clearAllLocalStorageData(): void {
    this.localStorageService.clearAllLocalStorageData();
  }

  navigateToLogin(options: NavigationBehaviorOptions = {}): void {
    this.router.navigateByUrl('', options).then(() => {
      window.location.reload();
    });
  }

  getNewAccessToken(): Observable<any> {
    const data = {
      accessToken: this.getAccessToken(),
    };
    return this.http.post(URL_CONSTANT.refreshTokenUrl, data);
  }

  setAccessToken(token: string): void {
    return this.localStorageService.setLocalStorageData(
      LOCAL_STORAGE_CONSTANT.token,
      token
    );
  }

  setUserData(user: Partial<any>): void {
    this.localStorageService.setLocalStorageData(
      LOCAL_STORAGE_CONSTANT.user,
      user
    );
  }

  getUserData(): any {
    const userToken = this.localStorageService.getLocalStorageData(
      LOCAL_STORAGE_CONSTANT.user
    );
    return userToken;
  }

  get isLoggedIn(): boolean {
    const authToken = this.getAccessToken();
    if (!authToken) {
      this.localStorageService.clearAllLocalStorageData();
    }
    return authToken ? true : false;
  }

  logoutByTokenExpiry(): void {
    this.clearAllLocalStorageData();
    this.logOutSubject.next();
    this.navigateToLogin();
  }

  async logout(): Promise<void> {
    this.clearAllLocalStorageData();
    await firstValueFrom(this.http.post(URL_CONSTANT.logoutUrl));
    this.logOutSubject.next();
    this.navigateToLogin();
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(URL_CONSTANT.loginUrl, user);
  }

  uploadPhoto(email: any, formData: FormData): Observable<any> {
    return this.http.post<any>('/uploadPhoto/' + email, formData, true);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(URL_CONSTANT.registerUrl, user);
  }

  getProfileUrl(path: string) {
    return `${environment.apiURL}/getImage/?filePath=${path}`;
  }

  get logOutStatus(): Observable<void> {
    return this.logOutSubject.asObservable();
  }
}
