import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  tokenTimeValid: number = 0;
  intervalId: any;
  user: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.user = user;
      this.tokenTimeValid = this.userService.getTokenTimeValid();

      this.intervalId = setInterval(() => {
        this.tokenTimeValid = this.userService.getTokenTimeValid();
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
