import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.getRole() === 'ADMIN') {
    return true;
  }

  // Redirect to login if not logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Redirect to employee form if user tries to access admin pages
  if (authService.getRole() === 'USER') {
    router.navigate(['/employee-form']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
