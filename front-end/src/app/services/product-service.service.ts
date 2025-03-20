import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    // Debug: Check if token exists
    console.log('Token exists:', !!token);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      // Check with your API whether it needs "Bearer " prefix
      headers = headers.set('token', token);
      console.log('Authorization header set:', headers.has('Authorization'));
    } else {
      console.warn('No token found in localStorage');
    }
    return headers;
  }
  private apiUrl = 'http://localhost:3000/createproduct';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    console.log('📡 Fetching products from:', this.apiUrl);
    return this.http.get<any>(this.apiUrl);
  }
  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      token: `${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, product, { headers });
  }
  deleteProduct(productId: number): Observable<any> {
    console.log('🗑 Deleting product ID:', productId);
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }
}
