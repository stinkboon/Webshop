import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-button/confirm-dialog/confirm-dialog.component'; 
import { CustomerViewModel } from '../../core/datacontracts/CustomerViewModel';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule 
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class CustomerComponent implements OnInit {
  public customers: CustomerViewModel[] = [];

  constructor(
    private _customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this._customerService.getAll().subscribe({
      next: (receivedCustomers) => {
        this.customers = receivedCustomers;
      },
      error: (err) => console.error('Error fetching clients:', err)
    });
  }

  deleteCustomer(customerId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Client',
        message: 'Are you sure you want to delete this client?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._customerService.delete(customerId).subscribe({
          next: () => {
            this.customers = this.customers.filter(p => p.id !== customerId);
          },
          error: (err) => console.error('Error deleting client:', err)
        });
      }
    });
  }
}
