import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService, CartItem } from '../../userservice/cart.service';
import{HeaderComponent} from '../header/header.component';
import{FooterComponent}   from  '../footer/footer.component' ;
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,FooterComponent],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fadeOut', [
      transition('* => out', [
        animate('0.5s ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cartItems: (CartItem & { removed?: boolean })[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (cartItems) => {
        // Adding `removed` flag to each item
        this.cartItems = cartItems.map(item => ({ ...item, removed: false }));
        this.cartService.updateLocalCart(this.cartItems);
      },
      error: (err) => {
        this.toastr.error('Failed to load cart', 'Error');
        console.error('Cart load error:', err);
      }
    });
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1 || newQuantity > item.stock) {
      return;
    }

    this.cartService.updateCartItem(item.productid, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.cartService.updateLocalCart(this.cartItems);
        this.toastr.success(`Quantity updated for ${item.name}`, 'Success');
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Failed to update quantity';
        if (errorMessage === 'Product not found in cart') {
          this.toastr.error('Product not found in cart', 'Error');
        } else if (errorMessage === 'Cart not found') {
          this.toastr.error('Cart not found', 'Error');
        } else if (errorMessage === 'Quantity must be a positive integer') {
          this.toastr.error('Quantity must be a positive number', 'Error');
        } else {
          this.toastr.error(errorMessage, 'Error');
        }
        console.error('Quantity update error:', err);
      }
    });
  }

  removeFromCart(item: CartItem & { removed?: boolean }) {
    item.removed = true; // Trigger the animation
    setTimeout(() => {
      this.cartService.removeFromCart(item.productid).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(i => i.productid !== item.productid);
          this.cartService.updateLocalCart(this.cartItems);
          this.toastr.success(`${item.name} removed from cart`, 'Success');
        },
        error: (err) => {
          this.toastr.error('Failed to remove item', 'Error');
          console.error('Remove error:', err);
        }
      });
    }, 500); // wait for animation to finish
  }

  getSubtotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getSubtotal(item), 0);
  }

  proceedToPayment() {
    if (this.cartItems.length === 0) {
      this.toastr.warning('Your cart is empty', 'Warning');
      return;
    }
    this.toastr.info('Redirecting to payment page...', 'Proceed to Payment');
    this.router.navigate(['/checkout']);
  }
}
