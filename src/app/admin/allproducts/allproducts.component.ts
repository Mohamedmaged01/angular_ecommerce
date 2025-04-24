<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
=======
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-all-products',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule,FormsModule],
=======
  imports: [CommonModule, FormsModule, ],
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  // Search and filter properties
  searchTerm: string = '';
  filterCategory: string = '';
  priceRange: { min: number | null; max: number | null } = {
    min: null,
    max: null,
  };
  stockStatus: string = '';
  categories: string[] = [];

  constructor(
<<<<<<< HEAD
    private productService: ProductService,
=======
    @Inject(ProductService) private productService: ProductService,
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        console.log('📦 Products fetched successfully:', response);
<<<<<<< HEAD
        this.products = response.map((product) => ({
          ...product,
          categoryDisplay: product.category?.name || 'Uncategorized', // Extract category name
        }));
=======
        this.products = response.map(
          (product: { category: any; [key: string]: any }) => ({
            ...product,
            categoryDisplay: this.getCategoryName(product.category),
          })
        );
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
        this.categories = [
          ...new Set(this.products.map((p) => p.categoryDisplay)),
        ];
        this.applyFilters();
      },
      (error) => {
        console.error('❌ Error fetching products:', error);
      }
    );
  }

<<<<<<< HEAD
=======
  private getCategoryName(category: any): string {
    // Handle different category formats:
    // If category is an object with name property
    if (category && typeof category === 'object' && 'name' in category) {
      return category.name;
    }
    // If category is already a string
    if (typeof category === 'string') {
      return category;
    }
    // Default case
    return 'Uncategorized';
  }

>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      // Search by name
      const matchesSearch =
        !this.searchTerm ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filter by category name
      const matchesCategory =
        !this.filterCategory || product.categoryDisplay === this.filterCategory;

      // Filter by price range
      const matchesPriceRange =
        (this.priceRange.min === null ||
          product.price >= this.priceRange.min) &&
        (this.priceRange.max === null || product.price <= this.priceRange.max);

      // Filter by stock status
      let matchesStockStatus = true;
      if (this.stockStatus === 'low') {
        matchesStockStatus = product.stock < 5;
      } else if (this.stockStatus === 'medium') {
        matchesStockStatus = product.stock >= 5 && product.stock < 10;
      } else if (this.stockStatus === 'high') {
        matchesStockStatus = product.stock >= 10;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriceRange &&
        matchesStockStatus
      );
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterCategory = '';
    this.priceRange = { min: null, max: null };
    this.stockStatus = '';
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  getPages(): number[] {
<<<<<<< HEAD
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
=======
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  navigateToAddProduct(): void {
<<<<<<< HEAD
    this.router.navigate(['adminproducts/add']);
  }

  editProduct(productId: string): void {
=======
    this.router.navigate(['/add-product']);
  }

  editProduct(productId: number): void {
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: string, productName: string): void {
<<<<<<< HEAD
=======
    if (!productId) {
      console.error('❌ Cannot delete - invalid product ID:', productId);
      return;
    }

>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${productName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            console.log('✅ Product deleted successfully');
            this.fetchProducts();
          },
          error: (err) => {
            console.error('❌ Delete failed:', err);
          },
        });
      }
    });
  }
}
