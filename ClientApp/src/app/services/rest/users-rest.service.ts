import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mod, User } from './models';
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

  deleteUser(user: User) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${user.id}`);
  }

  putUserRole(userId: number, role: Role) {
    return this.httpClient.put<void>(`${this.baseUrl}/${userId}/role`, { role });
  }
}
