import { Component,Input, OnChanges ,SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../userservice/product.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Product, CartService} from '../../userservice/cart.service';
import { Router } from '@angular/router';
import {WishlistService} from '../../userservice/wishlist.service';
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule ],
  selector: 'app-product-grid',

  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent  implements OnChanges {

  @Input() filters: any = {};
  @Input() searchTerm: any ='';
  products: any[] = [];

  categoryName: string = 'Products';
  currentPage: number = 1;
  limit: number = 9; 
  totalPages: number = 0;
  totalItems: number = 0;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;

  constructor(private productService: ProductService,
    private wishlistService: WishlistService,
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']|| changes['searchTerm']) {
      console.log('Filters changed in ProductGrid:', this.filters);
      this.categoryName = this.filters.categoryName || 'Products';
      this.currentPage = 1;
      this.loadProducts();
    }
  }




  addToFavorites(product: any): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.warning('You must register or log in first 🛑', 'Unauthorized');
      // this.router.navigate(['/register']); // optional: redirect
      return;
    }

    this.wishlistService.addToWishlist(product._id).subscribe({
      next: () => {
        this.toastr.success(`${product.name} added to your wishlist 💖`, 'Success');
      
      },
      error: (err) => {
        this.toastr.error('Could not add to wishlist ❌', 'Error');
        console.error(err);
      },
    });
  }











  loadProducts() {
    const finalFilters = {
      ...this.filters,
      search: this.searchTerm?.trim() || null
    };

    
    this.productService.getProductsByFillter(finalFilters, this.currentPage, this.limit).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (response.success) {
          this.products = response.data.products || [];
          const pagination = response.data.pagination;
          this.totalItems = pagination.total;
          this.totalPages = pagination.totalPages;
          this.hasNextPage = pagination.hasNextPage;
          this.hasPrevPage = pagination.hasPrevPage;
        } else {
          this.products = [];
          this.totalPages = 0;
          this.hasNextPage = false;
          this.hasPrevPage = false;
        }
      },
    
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products = [];
        this.totalPages = 0;
        this.hasNextPage = false;
        this.hasPrevPage = false;
      }
    });
  
    
  
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5; // Limit visible page numbers
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  getStars(rating: number): string {
    const fullStar = '★';
    const emptyStar = '☆';
    const maxStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;
    let stars = '';
    for (let i = 0; i < maxStars; i++) {
      stars += i < roundedRating ? fullStar : emptyStar;
    }
    return stars;
  }


  addToCart(product: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.warning('You must register or log in first 🛑', 'Unauthorized');
    
      return;
    }

    if (product.stock <= 0) {
      this.toastr.error(`${product.name} is out of stock ❌`, 'Error');
      return;
    }

    const cartProduct: Product = {
      productid: product._id,
      quantity: 1 
    };

    this.cartService.addToCart([cartProduct]).subscribe({
      next: (response) => {
        this.toastr.success(`${product.name} added to cart 🛒`, 'Success');
      },
      error: (err) => {
        const errorMessage = err.error.message || 'Failed to add to cart';
        this.toastr.error(errorMessage, 'Error');
        console.error('Cart error:', err);
      }
    });
  }

  


  

}
