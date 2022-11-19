import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/shared/auth.service';
import {Router} from "@angular/router";
import { Role } from 'src/app/services/rest/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(readonly authService: AuthService, private readonly router: Router) {}

  isLoggedIn$ = this.authService.isLoggedIn$;
  role$ = this.authService.isLoggedIn$;
  Role = Role;

  ngOnInit(): void {}

  onLoginClick() {
    this.router.navigate(['login']);
    return false;
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['']);
    return false;
  }

  onUploadModClick() {
    this.router.navigate(['upload']);
    return false;
  }

  onMyUploadsClick() {
    this.router.navigate(['mods']);
    return false;
  }
}
