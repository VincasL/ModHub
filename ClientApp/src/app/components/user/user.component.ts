import { Component, OnInit } from '@angular/core';
import { UsersRestService } from '../../services/rest/users-rest.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import {roleToDescription} from "../../shared/enums/role";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private readonly usersRestService: UsersRestService,
    private readonly route: ActivatedRoute
  ) {}

  user$ = this.route.params.pipe(
    map((params) => params['userId']),
    switchMap((userId) => this.usersRestService.getUser(userId))
  );

  ngOnInit(): void {}

  roleToDescription = roleToDescription
}
