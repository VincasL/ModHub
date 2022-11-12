import { Injectable } from '@angular/core';
import { LoginDto, Role, User } from '../rest/models';
import { SessionStorageKeys } from '../../shared/enums';
import { BehaviorSubject, map } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface UserData {
  username: string;
  email: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private guestUserData: UserData = {
    email: 'guest',
    role: Role.Guest,
    username: 'Guest',
  };

  private userDataSubject = new BehaviorSubject<UserData>(this.guestUserData);

  userData$ = this.userDataSubject.asObservable();
  role$ = this.userData$.pipe(map((userData) => userData.role));
  isLoggedIn$ = this.role$.pipe(map((role) => role !== Role.Guest));

  login(loginDto: LoginDto) {
    const accessToken = loginDto.accessToken;
    this.saveToken(accessToken);
    this.decodeTokenAndSetUserData(accessToken);
  }

  logout() {
    this.removeToken();
    this.resetUserData();
  }

  private saveToken(accessToken: string) {
    sessionStorage.setItem(SessionStorageKeys.AccessToken, accessToken);
  }

  private removeToken() {
    sessionStorage.removeItem(SessionStorageKeys.AccessToken);
  }

  constructor() {}

  getAccessToken(): string | null {
    return sessionStorage.getItem(SessionStorageKeys.AccessToken);
  }

  updateUserData(): void {
    const token = this.getAccessToken();
    this.decodeTokenAndSetUserData(token);
  }

  private decodeTokenAndSetUserData(accessToken: string | null) {
    if (!accessToken) {
      return;
    }

    try {
      const userData: UserData = jwt_decode(accessToken);
      this.userDataSubject.next(userData);
    } catch (Error) {
      this.removeToken();
      this.resetUserData();
    }
  }

  private resetUserData(){
    this.userDataSubject.next(this.guestUserData);
  }
}
