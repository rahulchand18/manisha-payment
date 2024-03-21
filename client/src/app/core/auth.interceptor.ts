import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshingAccessToken!: boolean;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(public authService: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        timeZoneId: this.getTimeZoneId(),
      },
      withCredentials: true,
    });
    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken());
    }
    return next.handle(request).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catchError((error: HttpErrorResponse): Observable<any> => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (request.url.includes('refresh-access-token')) {
            this.authService.logoutByTokenExpiry();
          } else {
            return this.handle401Error(request, next);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private getTimeZoneId(): string {
    return String(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    if (!this.refreshingAccessToken) {
      if (!this.authService.getAccessToken()) {
        this.authService.clearAllLocalStorageData();
        this.authService.navigateToLogin({ skipLocationChange: true });
        return of('Logout Success');
      }
      this.refreshingAccessToken = true;
      this.refreshTokenSubject.next(null);

      return this.authService.getNewAccessToken().pipe(
        switchMap((res) => {
          const { data } = res;
          const accessToken = data.accessToken;
          this.refreshingAccessToken = false;
          this.authService.setAccessToken(accessToken);
          this.refreshTokenSubject.next(accessToken);
          return next.handle(this.addToken(request, accessToken));
        }),
        catchError((error) => {
          this.refreshingAccessToken = false;
          return throwError(() => error);
        })
      );
    } else {
      if (!this.authService.getAccessToken()) {
        this.refreshingAccessToken = false;
        this.authService.navigateToLogin({ skipLocationChange: true });
      }
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt as string));
        }),
        catchError((err) => {
          this.refreshingAccessToken = false;
          return throwError(() => err);
        })
      );
    }
  }
}
