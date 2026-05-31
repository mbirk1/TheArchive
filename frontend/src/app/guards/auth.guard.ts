import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../api/auth/auth.store';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authStore.isAuthenticated()) return true;

  const refreshToken = tokenService.getRefreshToken();
  if (refreshToken) {
    authService.initializeAuth();
    if (authStore.isAuthenticated()) return true;
  }

  router.navigate(['/login']);
  return false;
};
