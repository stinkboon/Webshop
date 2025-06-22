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


@Component({
  selector: 'app-client-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [CustomerService],
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export  class CustomerCreateComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
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
      const customer: CreateCustomerModel = this.customerForm.value;
      this.customerService.create(customer).subscribe({
        next: (_) => {
          this.router.navigate(['/platform/clients']);
        },
        error: (err) => {
          console.error('Client creation failed:', err);
        }
      });
    }
  }
}