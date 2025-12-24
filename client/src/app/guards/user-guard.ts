import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.getRole() === 'USER') {
    return true;
  }

  // Redirect to login if not logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Redirect to admin dashboard if admin tries to access user pages
  if (authService.getRole() === 'ADMIN') {
    router.navigate(['/admin-dashboard']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
