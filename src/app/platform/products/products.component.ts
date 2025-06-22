import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductViewModel } from '../../core/datacontracts/ProductViewModel';
import { ProductService } from '../../core/services/product.service';
import { ConfirmDialogComponent } from '../confirm-button/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule 
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductComponent implements OnInit {
  public products: ProductViewModel[] = [];

  constructor(
    private _productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this._productService.getAll().subscribe({
      next: (receivedProducts) => {
        this.products = receivedProducts;
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  deleteProduct(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._productService.delete(productId).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== productId);
          },
          error: (err) => console.error('Error deleting product:', err)
        });
      }
    });
  }
}
