import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = loginService.isLoggedIn();
  const userRole = loginService.getUserRole();

  if (isLoggedIn && userRole === 'ADMIN') {
    return true;
  }

  // If not logged in or not an admin, redirect to the login page
   router.navigate(['login']);
   return false;
};