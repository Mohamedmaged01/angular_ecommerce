import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/allproduct';
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
