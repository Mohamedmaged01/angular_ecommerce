import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Review {
  _id: string;
  user_id: string;
  product_id: string;
  rating: number;
  review: string;
  createdAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  Math = Math;
  product: any;
  errorMessage: string = '';
  productId: string = '';
  quantity: number = 1;
  reviews: Review[] = [];
  showReviewForm: boolean = false;
  isSubmitting: boolean = false;

  newReview = {
    rating: 5,
    review: '',
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadProduct();
    this.loadReviews();
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data?.data;
      },
      error: (error) => {
        this.errorMessage = 'Error loading product details.';
      },
    });
  }

  addToCart() {
    let cart = localStorage.getItem('cart');
    let cartArray = cart ? JSON.parse(cart) : [];

    let productToAdd = {
      id: this.product._id,
      name: this.product.name,
      price: this.product.discountPrice || this.product.price,
      quantity: this.quantity,
      images: this.product.images,
    };

    let existingProduct = cartArray.find(
      (item: any) => item.id === productToAdd.id
    );

    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      cartArray.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cartArray));
    alert('Product added to cart successfully!');
  }

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  loadReviews() {
    this.productService.getProductReviews(this.productId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.reviews = []; // Fallback to empty array
      },
    });
  }

  async submitReview() {
    if (this.isSubmitting) return;

    // Validate inputs
    if (!this.newReview.review.trim()) {
      alert('Please enter your review');
      return;
    }

    if (this.newReview.rating < 1 || this.newReview.rating > 5) {
      alert('Please select a valid rating between 1 and 5');
      return;
    }

    this.isSubmitting = true;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to submit a review');
        return;
      }

      await this.productService
        .createReview(this.productId, this.newReview)
        .toPromise();

      alert('Review submitted successfully!');
      this.showReviewForm = false;
      this.newReview = { rating: 5, review: '' };
      this.loadReviews();
      this.loadProduct(); // Refresh product rating
    } catch (error: any) {
      console.error('Full error:', error);

      if (error.status === 401) {
        alert('Please login to submit a review');
      } else if (error.error?.message) {
        alert(error.error.message);
      } else {
        alert('Error submitting review. Please try again.');
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}
