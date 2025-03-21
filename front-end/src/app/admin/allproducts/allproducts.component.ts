import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css',
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];

  constructor(@Inject(ProductService) private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        console.log('📦 Products fetched successfully:', response);
        this.products = response;
      },
      (error) => {
        console.error('❌ Error fetching products:', error);
      }
    );
  }
}
