import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
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

  // Data is al beschikbaar
  public totalProducts: number = 120;     // voorbeelddata
  public totalCustomers: number = 85;
  public activeUsers: number = 14;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user) {
      this.tokenTimeValid = this.userService.getTokenTimeValid();
      // Als je real-time data wilt, kun je hier nog services aanroepen
    }
  }
}
