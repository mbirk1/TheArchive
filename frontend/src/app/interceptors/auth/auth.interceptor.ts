import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, EMPTY } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';
import { SKIP_AUTH } from '../../api/auth/http.context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);


  if(req.context.get(SKIP_AUTH)) {
    return next(req)
  }

  if (isAuthEndpoint(req.url)) {
    return next(req);
  }

  const accessToken = tokenService.getAccessToken();

  if (!accessToken) {
    return next(req);
  }

  if (tokenService.isAccessTokenExpired()) {
    return authService.refreshTokens().pipe(
      switchMap(() => {
        const newToken = tokenService.getAccessToken();
        return newToken ? next(addAuthHeader(req, newToken)) : EMPTY;
      }),
      catchError(() => {
        authService.logout();
        return EMPTY;
      }),
    );
  }

  return next(addAuthHeader(req, accessToken)).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshTokens().pipe(
          switchMap(() => {
            const newToken = tokenService.getAccessToken();
            return newToken ? next(addAuthHeader(req, newToken)) : EMPTY;
          }),
          catchError(() => {
            authService.logout();
            return EMPTY;
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};

function addAuthHeader(
  req: HttpRequest<unknown>,
  token: string,
): HttpRequest<unknown> {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

function isAuthEndpoint(url: string): boolean {
  return ['/auth/login', '/auth/register', '/auth/refresh'].some((endpoint) =>
    url.includes(endpoint),
  );
}
