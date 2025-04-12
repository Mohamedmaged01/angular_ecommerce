import { Component,EventEmitter, Output,OnInit ,OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{WishlistService} from '../../userservice/wishlist.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent    {
  wishlistCount: number = 0;
  private counterSubscription!: Subscription;

  constructor(private router:Router) {}
  navigateToWishlist() {
  
    this.router.navigate(['/wishlist']);
  }


  @Output() searchChange = new EventEmitter<string>();
  searchQuery = '';

  onSearch() {
    this.searchChange.emit(this.searchQuery);
  }
}
