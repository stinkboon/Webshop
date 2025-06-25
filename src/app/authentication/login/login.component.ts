import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed = false;
  loading = false;
  darkMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      const loginDto = this.loginForm.value;

      this.authService.login(loginDto).subscribe({
        next: (result: { token: string }) => {
          localStorage.setItem('token', result.token);
          this.loginFailed = false;
          this.loading = false;
          this.router.navigate(['/platform/products']);
        },
        error: () => {
          this.loginFailed = true;
          this.loading = false;
        }
      });
    }
  }

  loginWithGoogle() {
    alert('Login met Google nog niet geïmplementeerd');
  }

  loginWithFacebook() {
    alert('Login met Facebook nog niet geïmplementeerd');
  }

}
