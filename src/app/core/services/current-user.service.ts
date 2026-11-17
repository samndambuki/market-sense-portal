import { Injectable } from '@angular/core';
import { User } from '../../features/auth/models/user.model';

type Role = User['role'];

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  get user(): User | null {
    try {
      const raw = localStorage.getItem('current_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (error) {
      return null;
    }
  }

  hasRole(...roles: Role[]): boolean {
    const role = this.user?.role;
    return !!role && roles.includes(role);
  }
}
