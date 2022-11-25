import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthRestService {
  baseUrl: string;

  constructor(private readonly httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api/auth`
  }

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
  ): Observable<LoginDto> {
    return this.httpClient.post<LoginDto>(`${this.baseUrl}/register`, {
      email,
      password,
      username,
    });
  }
}
