import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../shared/enums/role';

@Injectable({
  providedIn: 'root',
})
export class UsersRestService {
  constructor(private readonly httpClient: HttpClient) {}

  baseUrl = 'api/users';

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/profile`);
  }

  deleteUser(user: User) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${user.id}`);
  }

  putUserRole(userId: number, role: Role) {
    return this.httpClient.put<void>(`${this.baseUrl}/${userId}/role`, {
      role,
    });
  }

  putCurrentUser(user: User) {
    return this.httpClient.put<void>(`${this.baseUrl}/profile`, user);
  }
}
