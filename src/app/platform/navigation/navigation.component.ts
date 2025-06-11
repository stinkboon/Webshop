import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule, 
    CommonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isOpen = false;

  @Output() sidenavToggle = new EventEmitter<boolean>();

  toggleSidenav() {
    this.isOpen = !this.isOpen;
    this.sidenavToggle.emit(this.isOpen);
}
}