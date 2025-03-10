import { CanActivateFn, Router } from '@angular/router';
import { AuthServceService } from '../Services/auth/auth-servce.service';
import { inject } from '@angular/core';

export const closeauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServceService)
  const router = inject(Router);
  const users = authService.getUser();

  const multipleOrZeroLogin = users.filter(user => user.data.isLoggedIn);
  if(!multipleOrZeroLogin.length || multipleOrZeroLogin.length > 1){
    return true
  }
  authService.currentUser = multipleOrZeroLogin[0];
  router.navigate(["/dashboard/home"])
  return false;
};
