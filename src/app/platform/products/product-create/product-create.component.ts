import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router, RouterModule } from '@angular/router';
import { CreateProductModel } from '../../../core/datacontracts/CreateProductModel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ProductService],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      const product: CreateProductModel = this.productForm.value;
      this.productService.create(product).subscribe({
        next: (_) => {
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Product creation failed:', err);
        }
      });
    }
  }
}