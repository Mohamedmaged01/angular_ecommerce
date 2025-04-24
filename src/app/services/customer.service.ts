import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private API_URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}
  getCustomers(): Observable<any> {
    console.log('Fetching customers from:', this.API_URL);
    return this.http.get<any>(this.API_URL);
  }
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }
  updateCustomer(id: string, customer: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, customer);
  }
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost:3000/users';
  getCustomers(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User may need to log in.");
      return throwError(() => new Error("No token available. Please log in."));
    }
    
    return this.http.get<any>(this.API_URL);
  }

  private API_URL1 = 'http://localhost:3000/users';
  deleteCustomer (id: any): Observable<any> {
    return this.http.delete(`${this.API_URL1}/${id}`);
  }

  private API_URL3 = 'http://localhost:3000/users';
  getCustomerById(id: any): Observable<any> {
    return this.http.get(`${this.API_URL3}/${id}`);
  }

  private API_URL2 = 'http://localhost:3000/users';
  updateCustomer (id: any, customer: any): Observable<any> {
    return this.http.put(`${this.API_URL2}/${id}`, customer);
  }

>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
}
