import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css'],
})
export class AllProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('addProductModal') addModalElement!: ElementRef;
  @ViewChild('editProductModal') editModalElement!: ElementRef;
  @ViewChild('addForm') addForm!: NgForm;
  @ViewChild('editForm') editForm!: NgForm;

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

  // Modal instances
  addModal!: Modal;
  editModal!: Modal;

  // Product models
  newProduct: any = {
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
  };

  selectedProduct: any = {
    _id: '',
    name: '',
    price: 0,
    stock: 0,
    categoryDisplay: '',
    description: '',
  };

  // Loading states
  isAdding: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.addModal = new Modal(this.addModalElement.nativeElement);
    this.editModal = new Modal(this.editModalElement.nativeElement);
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.map((product: any) => ({
          ...product,
          categoryDisplay: this.getCategoryName(product.category),
        }));
        this.categories = [
          ...new Set(this.products.map((p) => p.categoryDisplay)),
        ];
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  private getCategoryName(category: any): string {
    if (category && typeof category === 'object' && 'name' in category) {
      return category.name;
    }
    if (typeof category === 'string') {
      return category;
    }
    return 'Uncategorized';
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch =
        !this.searchTerm ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.filterCategory || product.categoryDisplay === this.filterCategory;
      const matchesPriceRange =
        (this.priceRange.min === null ||
          product.price >= this.priceRange.min) &&
        (this.priceRange.max === null || product.price <= this.priceRange.max);

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

  // Modal methods
  openAddModal(): void {
    this.resetNewProduct();
    this.addModal.show();
  }

  closeAddModal(): void {
    this.addModal.hide();
    this.addForm.resetForm();
  }

  openEditModal(product: any): void {
    this.selectedProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryDisplay: product.categoryDisplay,
      description: product.description || '',
    };
    this.editModal.show();
  }

  closeEditModal(): void {
    this.editModal.hide();
    this.editForm.resetForm();
  }

  resetNewProduct(): void {
    this.newProduct = {
      name: '',
      price: 0,
      stock: 0,
      category: this.categories.length > 0 ? this.categories[0] : '',
      description: '',
    };
  }

  addProduct(): void {
    if (this.addForm.invalid) return;

    this.isAdding = true;
    this.productService.addProduct(this.newProduct).subscribe({
      next: (response) => {
        this.isAdding = false;
        this.addModal.hide();
        this.fetchProducts();
      },
      error: (error) => {
        this.isAdding = false;
        console.error('Error adding product', error);
      },
    });
  }

  updateProduct(): void {
    if (this.editForm.invalid) return;

    this.isUpdating = true;
    const productData = {
      name: this.selectedProduct.name,
      price: this.selectedProduct.price,
      stock: this.selectedProduct.stock,
      category: this.selectedProduct.categoryDisplay,
      description: this.selectedProduct.description,
    };

    this.productService
      .updateProduct(this.selectedProduct._id, productData)
      .subscribe({
        next: (response) => {
          this.isUpdating = false;
          this.editModal.hide();
          this.fetchProducts();
        },
        error: (error) => {
          this.isUpdating = false;
          console.error('Error updating product', error);
        },
      });
  }

  deleteProduct(productId: string, productName: string): void {
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
            this.fetchProducts();
          },
          error: (err) => {
            console.error('Delete failed:', err);
          },
        });
      }
    });
  }
}
