import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passwordMatchValidator } from '../passwordvalidator';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ShowHidePasswordComponent } from '../show-hide-password';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ShowHidePasswordComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  hideNew = true;
  hideConfirm = true;
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeated: ['', Validators.required]
    }, {
      validators: passwordMatchValidator('password', 'passwordRepeated')
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // Her-evaluatie triggers
    this.resetForm.get('password')?.valueChanges.subscribe(() => {
      this.resetForm.updateValueAndValidity();
    });

    this.resetForm.get('passwordRepeated')?.valueChanges.subscribe(() => {
      this.resetForm.updateValueAndValidity();
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.http.post('http://localhost:5103/api/auth/reset-password', {
      token: this.token,
      password: this.resetForm.value.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: err => {
        this.loading = false;
        const message = err?.error?.message || 'Er is een fout opgetreden';
        this.snackBar.open(`Fout: ${message}`, 'Sluiten', { duration: 4000 });
      }
    });
  }
}
