import { Injectable } from '@angular/core';
import { LoginDto } from '../rest/models';
import { SessionStorageKeys } from '../../shared/enums';
import { BehaviorSubject, map, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Role, RoleDescription } from '../../shared/enums/role';

interface UserData {
  username: string;
  email: string;
  role: RoleDescription;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private guestUserData: UserData = {
    email: 'guest',
    role: RoleDescription.Guest,
    username: 'Guest',
  };

  private userDataSubject = new BehaviorSubject<UserData>(this.guestUserData);

  userData$ = this.userDataSubject.asObservable();
  role$ = this.userData$.pipe(map((userData) => userData.role));
  isLoggedIn$ = this.role$.pipe(map((role) => role !== RoleDescription.Guest));

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
      const userDataRaw = jwt_decode(accessToken) as any;

      const userData = {
        username: userDataRaw[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] as string,
        email:
          userDataRaw[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
        role: userDataRaw[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
      } as UserData;

      this.userDataSubject.next(userData);
    } catch (Error) {
      this.removeToken();
      this.resetUserData();
    }
  }

  private resetUserData() {
    this.userDataSubject.next(this.guestUserData);
  }
}
