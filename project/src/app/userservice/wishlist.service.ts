import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  size: string;
  images: string[];
  featuredImage: string;
  avgRating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isFavorite: boolean;
  Promocode?: string;
  createdAt: string;
  updatedAt: string;
}






@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:3000'; 
  private token: string | null = localStorage.getItem('token');




  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      token: this.token || '',
    });
  }

  // Add product to wishlist
  addToWishlist(productId: string): Observable<{ message: string; wishlist?: Product[] }> {
    return this.http
      .post<{ message: string; wishlist?: Product[] }>(
        `${this.apiUrl}/addtowishlist`,
        { wishlist: [productId] },
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError((error) => {
          console.error('Error adding to wishlist:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  getWishlist(): Observable<Product[]> {
    return this.http
      .get<{ wishlist: Product[] }>(`${this.apiUrl}/allwishlist`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response.wishlist),
        catchError((error) => {
          console.error('Error fetching wishlist:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  deleteFromWishlist(productId: string): Observable<{ message: string; wishlist: Product[] }> {
    return this.http
      .delete<{ message: string; wishlist: Product[] }>(`${this.apiUrl}/deletefromwishlist/${productId}`, {
        headers: this.getHeaders(),
        
      })
      .pipe(
       
        catchError((error) => {
          console.error('Error deleting from wishlist:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        }),
       
      );
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

}


