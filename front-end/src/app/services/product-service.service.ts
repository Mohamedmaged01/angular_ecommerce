import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
 
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
  deleteProduct(productId: number): Observable<any> {
    console.log('🗑 Deleting product ID:', productId);
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }
}
