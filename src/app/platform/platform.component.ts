import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    NavigationComponent,
    HeaderComponent,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent {
  sidenavOpen = false;
  showSidenav = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      this.showSidenav = !['/login', '/register', '/forgot-password'].some(path => event.urlAfterRedirects.includes(path));

    });
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
