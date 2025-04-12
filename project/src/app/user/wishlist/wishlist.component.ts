import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService,Product } from '../../userservice/wishlist.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import{HeaderComponent} from '../header/header.component';
import{FooterComponent} from '../footer/footer.component';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterModule, NgbAlertModule,HeaderComponent,FooterComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  loading: boolean = true;
  removingProductIds: Set<string> = new Set();
  wishlist: Product[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private wishlistService: WishlistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadWishlist(); // Load wishlist data when component initializes
  }

  loadWishlist(): void {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe({
      next: (products) => {
        this.wishlist = [...products];
        this.errorMessage = products.length === 0 ? 'Your wishlist is empty.' : null;
        this.loading = false; // Stop loading when wishlist data is fetched
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load wishlist.';
        this.loading = false; // Stop loading in case of error
      },
    });
  }

  removeFromWishlist(productId: string): void {
    this.removingProductIds.add(productId);

    this.wishlistService.deleteFromWishlist(productId).subscribe({
      next: () => {
        this.successMessage = 'Product removed from wishlist!';
        setTimeout(() => (this.successMessage = null), 3000);
        this.loadWishlist(); // Reload wishlist after removing item
        this.removingProductIds.delete(productId);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to remove product.';
        setTimeout(() => (this.errorMessage = null), 3000);
        this.removingProductIds.delete(productId);
      },
    });
  }

  trackById(index: number, product: Product): string {
    return product._id;
  }
}