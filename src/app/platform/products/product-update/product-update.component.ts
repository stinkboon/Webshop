import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UpdateProductModel } from '../../../core/datacontracts/UpdateProductModel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-update',
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
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {
  public productForm: FormGroup | undefined;
  private productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const numericId = Number(id);
        this.productId = numericId;

        this.productService.getById(numericId).subscribe(product => {
          this.productForm = this.fb.group({
            name: [product.name, Validators.required],
            description: [product.description],
            price: [product.price, [Validators.required, Validators.min(0)]],
            discountPercentage: [product.discountPercentage, [Validators.required, Validators.min(0), Validators.max(100)]],
            stock: [product.stock, [Validators.required, Validators.min(0)]]
          });
        });
      }
    });
  }

  updateProduct() {
    if (this.productForm!.valid) {
      const product: UpdateProductModel = this.productForm!.value;
      product.id = this.productId;
      this.productService.update(product).subscribe({
        next: (_) => {
          this.router.navigate(['/platform/products']);
        },
        error: (err) => {
          console.error('Product update failed:', err);
        }
      });
    }
  }
}