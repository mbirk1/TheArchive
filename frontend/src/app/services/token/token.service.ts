import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IAuthTokens } from 'lib';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setTokens(tokens: IAuthTokens): void {
    if (!this.isBrowser) return;

    if (!tokens.access_token || !tokens.refresh_token) {
      console.error('TokenService: Attempted to store invalid tokens');
      return;
    }

    try {
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
    } catch (error) {
      console.error('TokenService: Failed to store tokens', error);
    }
  }

  getAccessToken(): string | null {
    if (!this.isBrowser) return null;
    try {
      return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  clearTokens(): void {
    if (!this.isBrowser) return;
    try {
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('TokenService: Failed to clear tokens', error);
    }
  }

  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= (payload.exp * 1000) - 10_000;
    } catch {
      return true;
    }
  }

  decodeAccessToken(): { userId: string; email: string } | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.sub || !payload.email) return null;
      return { userId: payload.sub, email: payload.email };
    } catch {
      return null;
    }
  }
}