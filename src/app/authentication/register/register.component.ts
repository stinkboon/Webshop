import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowHidePasswordComponent } from '../show-hide-password';
import { passwordMatchValidator } from '../passwordvalidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ShowHidePasswordComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  hideRegisterPassword = true;
  hideRegisterConfirm = true;  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator });
    
  }

  loading: boolean = false;

  register() {
    if (this.registerForm.valid) {
      this.loading = true; // Set loading to true when the request starts
      const { email, password } = this.registerForm.value;
      this.authService.register({ email, password }).subscribe({
        next: () => {
          this.loading = false; // Set loading to false when the request completes successfully
          this.snackBar.open('Registratie gelukt!', 'OK', {
            duration: 8000,
            panelClass: ['snackbar-success']
          });

          this.router.navigate(['/login']);
        },
        error: (err: { error: { message: string; }; }) => {
          this.loading = false; // Set loading to false when the request fails
          this.errorMessage = err.error.message || 'Registratie mislukt';
        }
      });
    }
  }
}