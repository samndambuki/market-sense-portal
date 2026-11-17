import { CanActivateFn, Router } from '@angular/router';
import { User } from '../../features/auth/models/user.model';
import { inject } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';

export const roleGuard =
  (...roles: User['role'][]): CanActivateFn =>
  () => {
    const currentUser = inject(CurrentUserService);
    const router = inject(Router);
    return currentUser.hasRole(...roles)
      ? true
      : router.createUrlTree(['/dashboard']);
  };
