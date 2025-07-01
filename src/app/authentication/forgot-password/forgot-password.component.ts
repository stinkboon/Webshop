import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink() {
    if (this.forgotForm.valid) {
      this.loading = true;
      const { email } = this.forgotForm.value;
      this.http.post('http://localhost:5103/api/auth/forgot-password', { email }).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Reset link is verzonden. Check je e-mail.', 'Sluiten', { duration: 4000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          const message = err?.error?.message || 'Er is een fout opgetreden';
          this.snackBar.open(`Fout: ${message}`, 'Sluiten', { duration: 4000 });
        }
      });
    }
  }
}
