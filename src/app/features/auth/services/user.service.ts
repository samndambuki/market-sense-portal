import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userapi = `${environment.api.baseUrl}${environment.api.users}`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.userapi}/login`, credentials);
  }

  register(user: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.userapi}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
  }
}
