import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private userapi = environment.api.baseUrl;
  private userapi = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}
  register(user: User) {
    // return this.http.post<User>(
    //   `${this.userapi}${environment.api.users}`,
    //   user
    // );
    return this.http.post<User>(this.userapi, user);
  }
}
