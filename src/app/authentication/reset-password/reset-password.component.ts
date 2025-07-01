import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ShowHidePasswordComponent } from "../show-hide-password";
import { passwordMatchValidator } from '../passwordvalidator';



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
    ShowHidePasswordComponent
],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }
  
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }
  hideNew = true;
  hideConfirm = true;

  
  passwordMatchValidator(formGroup: FormGroup) {
    const newPass = formGroup.get('newPassword')?.value;
    const confirmPass = formGroup.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { passwordMismatch: true };
  }
  
  loading = false;


  resetPassword() {
    if (this.resetForm.valid) {
      this.loading = true;
      const { newPassword } = this.resetForm.value;
      this.http.post('http://localhost:5103/api/auth/reset-password', {
        token: this.token,
        newPassword
      }).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Wachtwoord succesvol gewijzigd', 'Sluiten', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: err => {
          this.loading = false;
          const message = err?.error?.message || 'Er is een fout opgetreden';
          this.snackBar.open(`Fout: ${message}`, 'Sluiten', { duration: 4000 });
        }
      });
    }
  }  
}