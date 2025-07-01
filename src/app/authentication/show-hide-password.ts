import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-show-hide-password',
  template: `
    <button type="button" mat-icon-button (click)="toggle()" [attr.aria-label]="hide ? 'Toon wachtwoord' : 'Verberg wachtwoord'">
      <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  styles: [`
    button {
      vertical-align: middle;
    }
  `]
})
export class ShowHidePasswordComponent {
  @Input() hide = true;

  @Output() hideChange = new EventEmitter<boolean>();

  toggle() {
    this.hide = !this.hide;
    this.hideChange.emit(this.hide);
  }
}
