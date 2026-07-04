import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { Observable } from 'rxjs';
import { IAuthTokens, ILoginRequest, IRegisterRequest, IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class AuthGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  signingInUser(
    user: ILoginRequest,
  ): Observable<{ access_token: string; refresh_token: string }> {
    return this.http.post<{ access_token: string; refresh_token: string }>(
      this.configService.apiUrl + '/auth/login',
      user,
    );
  }

  logoutUser() {
    return this.http.post(this.configService.apiUrl + '/auth/logout', {});
  }

  refreshTokens(refreshToken: string): Observable<IAuthTokens> {
    return this.http.post<IAuthTokens>(
      `${this.configService.apiUrl}/refresh`,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    );
  }
}
