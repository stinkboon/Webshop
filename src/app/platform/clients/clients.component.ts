import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../confirm-button/confirm-dialog/confirm-dialog.component'; 
import { CustomerViewModel } from '../../core/datacontracts/CustomerViewModel';
import { CustomerService } from '../../core/services/customer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressBarModule,
    
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'actions'];
  public dataSource = new MatTableDataSource<CustomerViewModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  loading = false;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter) => {
      return Object.values(data).some(value =>
        String(value).toLowerCase().includes(filter)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCustomers(); // verplaatst naar hier!
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  getCustomers(): void {
    this.loading = true;  // start loading
    this._customerService.getAll().subscribe({
      next: (receivedCustomers) => {
        this.dataSource.data = receivedCustomers;
        this.loading = false; // klaar met laden
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        this.loading = false; // ook stoppen bij fout
      }
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
            this.dataSource.data = this.dataSource.data.filter(p => p.id !== customerId);
          },
          error: (err) => console.error('Error deleting client:', err)
        });
      }
    });
  }

  // CSV import
  importCSV(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.loading = true;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // result.data is any[], casten naar CustomerViewModel[]
        this.dataSource.data = result.data as CustomerViewModel[];
        this.loading = false;
      },
      error: (error) => {
        console.error('CSV parse error:', error);
        this.loading = false;
      }
    });
  }

  // CSV export
  exportCSV() {
    const csv = Papa.unparse(this.dataSource.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'clients.csv');
  }

  // Excel export
  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'clients.xlsx');
  }
}