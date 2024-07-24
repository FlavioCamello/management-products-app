import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  formEditProduct: FormGroup;
  productId: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formEditProduct = this.fb.group({
      name: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      costPrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      notes: [''],
      id: this.route.snapshot.params['id']
    });


  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.formEditProduct.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.formEditProduct.valid) {
      this.productService.updateProduct(this.productId, this.formEditProduct.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
