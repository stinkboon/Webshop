import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerViewModel } from '../../../core/datacontracts/CustomerViewModel';

@Component({
  selector: 'app-client-view',
  imports: [CommonModule, MatListModule, MatProgressSpinner],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.scss'
})
export class CustomerViewComponent {
  public customer?: CustomerViewModel; 

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const numericId = Number(id);
        this.customerService.getById(numericId).subscribe(customer => {
          this.customer = customer;
        });
      }
    });
  }
}