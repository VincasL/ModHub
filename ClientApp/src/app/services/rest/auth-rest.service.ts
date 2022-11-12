import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto, RegisterDto } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthRestService {
  baseUrl = 'api/auth';

  constructor(private readonly httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoginDto> {
    return this.httpClient.post<LoginDto>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  register(
    email: string,
    password: string,
    username: string
  ): Observable<RegisterDto> {
    return this.httpClient.post<RegisterDto>(`${this.baseUrl}/register`, {
      email,
      password,
      username,
    });
  }
}
