<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
  imports: [NgIf, SidebarComponent, CommonModule],
=======
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
})
export class CustomerComponent implements OnInit {
  customers: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private customerService: CustomerService,
<<<<<<< HEAD
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit triggered'); // Debugging
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    console.log('Fetching customers from API...');
=======
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    this.loadCustomers();
  }
  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = null;
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956

    this.customerService.getCustomers().subscribe({
      next: (response) => {
        console.log('API Response:', response);
<<<<<<< HEAD

        if (!response || !response.users) {
          console.error('Response is empty or missing "users" key!');
          this.customers = []; // Ensure it's an empty array
          return;
        }

        this.customers = response.users; // ✅ Assign correctly
        console.log('Updated Customers:', this.customers);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('API Error:', error);
        this.errorMessage = error.error?.message || 'Failed to load customers';
=======
        this.customers = response.customers || response;
        this.isLoading = false;
        console.log(this.customers);
      },
      error: (error) => {
        console.error('API Error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please login again.';
        } else {
          this.errorMessage =
            error.error?.message || 'Failed to load customers';
        }
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
        this.isLoading = false;
      },
    });
  }

<<<<<<< HEAD
  deleteCustomer(id: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        console.log('Customer deleted successfully.');
        this.loadCustomers(); // Reload customers after deletion
      },
      error: (error) => {
        console.error('API Error:', error);
        this.errorMessage = error.error?.message || 'Failed to delete customer';
=======
  deleteCustomers(id: any) {
    this.customerService.deleteCustomer(id).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.loadCustomers();
      },
      error: (error) => {
        console.error('API Error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please login again.';
        } else {
          this.errorMessage =
            error.error?.message || 'Failed to delete customer';
        }
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
        this.isLoading = false;
      },
    });
  }

  goToUpdateCustomer(customer: any) {
    this.router.navigate(['/updatecustomer', customer._id]);
  }

  goToCustomerDetails(customer: any) {
    this.router.navigate(['/customerdetails', customer._id]);
  }
}
