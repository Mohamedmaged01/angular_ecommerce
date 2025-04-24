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
})
export class CustomerComponent implements OnInit {
  customers: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private customerService: CustomerService,
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

    this.customerService.getCustomers().subscribe({
      next: (response) => {
        console.log('API Response:', response);

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
        this.isLoading = false;
      },
    });
  }

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
