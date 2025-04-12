import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allproduct`);
  }
  getproductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductsByFillter(filters: any ,page: number = 1, limit: number = 9): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
    
    
    
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null) { 
        params = params.set(key, filters[key].toString());
      }
    }
    console.log('Sending request with params:', params.toString()); // Debug
    return this.http.get(`${this.apiUrl}/products`, { params });
  }
}
