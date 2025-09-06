import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
 const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = authService.getToken();
  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
