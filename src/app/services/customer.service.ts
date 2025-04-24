import { Injectable } from '@angular/core';
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
}
