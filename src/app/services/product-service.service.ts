import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

=======
import { catchError, Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
@Injectable({
  providedIn: 'root',
})
export class ProductService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:3000/products';
  private createProductUrl = 'http://localhost:3000/createproduct';
  private deleteProductUrl = 'http://localhost:3000/deleteproduct';

  constructor(private http: HttpClient) {}

  /** Fetch All Products */
  getProducts(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response.success && response.data && response.data.products) {
          return response.data.products;
        } else {
          throw new Error('Invalid API response structure');
        }
      }),
      catchError((error) => {
        console.error('❌ Error fetching products:', error);
        return throwError(() => new Error('Failed to fetch products.'));
      })
    );
  }

  /** Add a Product */
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.createProductUrl, product).pipe(
      catchError((error) => {
        console.error('❌ Error adding product:', error);
        return throwError(() => new Error('Failed to add product.'));
      })
    );
  }

  /** Get Single Product by ID */
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`❌ Error fetching product with ID ${id}:`, error);
        return throwError(() => new Error('Failed to fetch product.'));
      })
    );
  }

  /** Update Product */
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product).pipe(
      catchError((error) => {
        console.error(`❌ Error updating product with ID ${id}:`, error);
        return throwError(() => new Error('Failed to update product.'));
      })
    );
  }

  /** Delete Product */
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.deleteProductUrl}/${productId}`).pipe(
      catchError((error) => {
        console.error(`❌ Error deleting product with ID ${productId}:`, error);
        return throwError(() => new Error('Failed to delete product.'));
      })
    );
  }
=======
  constructor(private http: HttpClient) {}

  private apiUrl1 = 'http://localhost:3000/allproduct';
  getProducts(): Observable<any> {
    console.log('📡 Fetching products from:', this.apiUrl);
    return this.http.get<any>(this.apiUrl1);
  }

  private apiUrl = 'http://localhost:3000/createproduct';
  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post<any>(this.apiUrl, product);
  }
  deleteProduct(productId: string): Observable<any> {
    if (!productId) {
      return throwError(() => new Error('Invalid product ID'));
    }

    const deleteUrl = `http://localhost:3000/deleteproduct/${productId}`;
    console.log('📡 Sending DELETE request to:', deleteUrl);

    return this.http.delete<any>(deleteUrl).pipe(
      catchError((error) => {
        console.error('❌ API Error:', error);
        return throwError(() => error);
      })
    );
  }
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
}
