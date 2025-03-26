import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  currentProduct: any = null;
  categoryId: string | null = null;
  isLoading: boolean = true;
  showMode: 'all' | 'category' | 'single' = 'all';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkAuthentication();
    this.setupRouteListener();
  }

  private checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLoading = false;
    }
  }

  private setupRouteListener() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      const productId = params.get('id');

      if (productId) {
        this.loadSingleProduct(productId);
      } else if (this.categoryId) {
        this.loadProductsByCategory();
      } else {
        this.loadAllProducts();
      }
    });
  }

  private loadAllProducts() {
    this.isLoading = true;
    this.showMode = 'all';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading all products:', err);
        this.allProducts = [];
        this.isLoading = false;
      }
    });
  }

  private loadProductsByCategory() {
    this.isLoading = true;
    this.showMode = 'category';

    if (!this.categoryId) return;

    this.productService.getProductsByCategory(this.categoryId).subscribe({
      next: (products) => {
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products by category:', err);
        this.filteredProducts = [];
        this.isLoading = false;
      }
    });
  }

  private loadSingleProduct(productId: string) {
    this.isLoading = true;
    this.showMode = 'single';

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.currentProduct = product;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.currentProduct = null;
        this.isLoading = false;
      }
    });
  }
}
