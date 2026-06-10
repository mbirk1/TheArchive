import { Injectable, signal, computed, inject, Signal } from '@angular/core';
import { IAuthState, IAuthTokens, IAuthUser, ILoginRequest } from 'lib';
import { AuthGateway } from './auth.gateway';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token/token.service';

const INITIAL_STATE: IAuthState = {
  user: null,
  isLoading: false,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _state = signal<IAuthState>(INITIAL_STATE);
  private authGateway: AuthGateway = inject(AuthGateway);
  private tokenService: TokenService = inject(TokenService);
  readonly user: Signal<IAuthUser | null> = computed(() => this._state().user);
  readonly isLoading: Signal<boolean> = computed(() => this._state().isLoading);
  readonly error: Signal<string | null> = computed(() => this._state().error);
  readonly isAuthenticated: Signal<boolean> = computed(
    () => !!this._state().user && !this.tokenService.isAccessTokenExpired(),
  );

  get accessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  get refreshToken(): string {
    if (this.tokenService.getRefreshToken() === null) {
      return '';
    }
    return this.tokenService.getRefreshToken()!;
  }

  setLoading(isLoading: boolean): void {
    this._state.update((state) => ({ ...state, isLoading, error: null }));
  }

  setTokens(accessToken: string, refreshToken: string): void {
    if (!accessToken || !refreshToken) {
      console.error('AuthStore: Attempted to set invalid tokens');
      return;
    }
    this._state.update((state) => ({ ...state, accessToken, refreshToken }));
  }

  setUser(user: IAuthUser): void {
    if (!user?.userId || !user?.email) {
      console.error('AuthStore: Attempted to set invalid user');
      return;
    }
    this._state.update((state) => ({ ...state, user }));
  }

  setError(error: string): void {
    this._state.update((state) => ({
      ...state,
      error,
      isLoading: false,
    }));
  }

  setAuthenticated(user: IAuthUser): void {
    if (!user?.userId || !user?.email) {
      console.error('AuthStore: Attempted to set invalid user');
      return;
    }
    this._state.update(() => ({
      user,
      isLoading: false,
      error: null,
    }));
  }

  reset(): void {
    this._state.set(INITIAL_STATE);
  }

  login(
    user: ILoginRequest,
  ): Observable<{ access_token: string; refresh_token: string }> {
    return this.authGateway.signingInUser(user);
  }

  logout() {
    return this.authGateway.logoutUser();
  }

  refreshTokens() {
    return this.authGateway.refreshTokens(this.refreshToken);
  }
}
