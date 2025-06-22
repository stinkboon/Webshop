import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../core/services/customer.service';
import { UpdateCustomerModel } from '../../../core/datacontracts/UpdateCustomerModel';


@Component({
  selector: 'app-client-update',
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
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class CustomerUpdateComponent {
  public customerForm: FormGroup | undefined;
  private customerId!: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const numericId = Number(id);
        this.customerId = numericId;

        this.customerService.getById(numericId).subscribe(customer => {
          this.customerForm = this.fb.group({
            firstName: [customer.firstName, Validators.required],
            lastName: [customer.lastName, Validators.required],
            email: [customer.email, [Validators.required, Validators.email]],
            phoneNumber: [customer.phoneNumber, Validators.required],
            address: [customer.address, Validators.required],
            city: [customer.city, Validators.required],
            state: [customer.state, Validators.required],
            zip: [customer.zip, Validators.required],
          });           
        });
      }
    });
  }

  updateCustomer() {
    if (this.customerForm!.valid) {
      const customer: UpdateCustomerModel = this.customerForm!.value;
      customer.id = this.customerId;
      this.customerService.update(customer).subscribe({
        next: (_) => {
          this.router.navigate(['/platform/clients']);
        },
        error: (err) => {
          console.error('Product update failed:', err);
        }
      });
    }
  }
}