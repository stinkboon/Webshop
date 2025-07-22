import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateCustomerModel } from '../../../core/datacontracts/CreateCustomerModel';
import { CustomerService } from '../../../core/services/customer.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [CustomerService],
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export  class CustomerCreateComponent {
  public customerForm: FormGroup;

  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  createCustomer() {
    if (this.customerForm.valid) {
      this.loading = true;
      const customer: CreateCustomerModel = this.customerForm.value;
      this.customerService.create(customer).subscribe({
        next: (_) => {
          this.loading = false;
          this.snackBar.open('Client succesvol aangemaakt.', 'Sluiten', { duration: 4000 });
          this.router.navigate(['/platform/clients']);
        },
        error: (err) => {
          console.error('Client creation failed:', err);
        }
      });
    }
  }
}