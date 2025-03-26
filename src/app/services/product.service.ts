import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('token', `${token}`);
    }
    return headers;
  }

  getProducts(): Observable<any[]> {
    return this.http.get<{ message: string; data: any[] }>(`${this.apiUrl}/products`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data),
      catchError(() => of([]))
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(() => of(null))
    );
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    if (!categoryId) return of([]);

    console.log('Requesting products for category:', categoryId);

    return this.http.get<any>(`${this.apiUrl}/getproductsbycategory/${categoryId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => console.log('API Response:', response)),
      map(response => response.data || response),
      catchError(error => {
        console.error('API Error:', error); 
        return of([]);
      })
    );
  }
}
