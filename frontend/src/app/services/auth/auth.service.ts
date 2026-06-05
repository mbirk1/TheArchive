import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError, Observable, EMPTY } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from '../../environments/environment';
import { AuthStore } from '../../api/auth/auth.store';
import { IAuthTokens, ILoginRequest } from 'lib';
import { UserStore } from '../../api/user/user.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);
  private readonly tokenService = inject(TokenService);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private refreshInProgress = false;

  initializeAuth(): void {
    const accessToken = this.tokenService.getAccessToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (!accessToken || !refreshToken) return;

    if (this.tokenService.isAccessTokenExpired()) {
      this.refreshTokens().subscribe({
        error: () => this.logout(),
      });
      return;
    }

    const user = this.tokenService.decodeAccessToken();
    if (!user) {
      this.logout();
      return;
    }

    this.authStore.setAuthenticated(user);
  }

  login(request: ILoginRequest): Observable<IAuthTokens> {
    if (!request?.email || !request?.password) {
      return throwError(() => new Error('Email and password are required'));
    }

    this.authStore.setLoading(true);

    return this.authStore.login(request).pipe(
      tap(tokens => this.handleAuthSuccess(tokens)),
      catchError(error => this.handleAuthError(error)),
    );
  }

  refreshTokens(): Observable<IAuthTokens> {
    if (this.refreshInProgress) return EMPTY;

    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return EMPTY;
    }

    this.refreshInProgress = true;

    return this.authStore.refreshTokens().pipe(
      tap((tokens) => {
        this.handleAuthSuccess(tokens);
        this.refreshInProgress = false;
      }),
      catchError((error) => {
        this.refreshInProgress = false;
        this.logout();
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    const accessToken = this.tokenService.getAccessToken();

    if (accessToken) {
      this.http
        .post(`${this.apiUrl}/logout`, {})
        .pipe(
          catchError(() => EMPTY),
        )
        .subscribe();
    }

    this.tokenService.clearTokens();
    this.authStore.reset();
    this.router.navigate(['/login']);
  }

  private handleAuthSuccess(tokens: IAuthTokens): void {
    if (!tokens?.access_token || !tokens?.refresh_token) {
      this.authStore.setError('Invalid response from server');
      return;
    }

    this.tokenService.setTokens(tokens);

    const user = this.tokenService.decodeAccessToken();
    if (!user) {
      this.authStore.setError('Failed to decode user from token');
      return;
    }

    this.authStore.setAuthenticated(user);
    this.userStore.currentUser();
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred';

    if (error.status === 0) {
      message = 'Unable to reach server';
    } else if (error.status === 401) {
      message = 'Invalid credentials';
    } else if (error.status === 409) {
      message = 'Email already in use';
    } else if (error.status === 422) {
      message = 'Invalid input';
    } else if (error.status >= 500) {
      message = 'Server error – please try again later';
    }

    this.authStore.setError(message);
    return throwError(() => new Error(message));
  }
}
