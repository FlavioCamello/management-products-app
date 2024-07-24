import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  formProduct: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      costPrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.formProduct.valid) {
      this.productService.createProduct(this.formProduct.value).subscribe(
        response => {
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Error creating product', error);
        }
      );
    }
  }
}
