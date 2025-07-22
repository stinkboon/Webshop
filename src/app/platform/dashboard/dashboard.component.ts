import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public user: any;
  public tokenTimeValid: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.user = user;
      this.tokenTimeValid = this.userService.getTokenTimeValid();
    }
  }
}  