import { Component, OnInit } from '@angular/core';
import {AuthService} from "./services/shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ClientApp';

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.updateUserData();
  }
}
