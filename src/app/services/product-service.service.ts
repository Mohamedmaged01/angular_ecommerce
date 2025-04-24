import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
}
