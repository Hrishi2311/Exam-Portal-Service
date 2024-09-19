import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = loginService.isLoggedIn();
  const userRole = loginService.getUserRole();

  if (isLoggedIn && userRole === 'NORMAL') {
    return true;
  }

  // If not logged in or not a user, redirect to the login page
   router.navigate(['login']);
   return false;
};
