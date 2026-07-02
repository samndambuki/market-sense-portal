import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userapi = environment.api.baseUrl;
  constructor(private http: HttpClient) {}
  login(email: string) {
    return this.http.get<User[]>(`${this.userapi}?email=${email}`);
  }
  register(user: User) {
    return this.http.post<User>(
      `${this.userapi}${environment.api.users}`,
      user,
    );
  }
}
