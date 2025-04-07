import { Component ,EventEmitter, Output, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import{CategoryService} from '../../userservice/category.service'
@Component({
  standalone: true,
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{
  @Output() filterChange = new EventEmitter<any>();
  categories: any[] = [];
  minPrice = 0; // Minimum price slider
  maxPrice = 500; // Maximum price slider
  colors = ['Red', 'Green', 'Yellow', 'Blue', 'Purple', 'Black', 'White'];
  selectedColors: string[] = [];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  selectedSizes: string[] = [];
  inStock = false;
  isFeatured = false;
  isFavorite = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.map((cat: any) => ({ ...cat, selected: false }));
    });
  }

  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1); // Deselect
    } else {
      this.selectedColors.push(color); // Select
    }
  }

  toggleSize(size: string) {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1); // Deselect
    } else {
      this.selectedSizes.push(size); // Select
    }
  }

  applyFilters() {
    const selectedCategory = this.categories.find(cat => cat.selected);
    const filters: any = {
      minPrice: this.minPrice, 
      maxPrice: this.maxPrice, 
      color: this.selectedColors.length > 0 ? this.selectedColors.join(',') : undefined,
      size: this.selectedSizes.length > 0 ? this.selectedSizes.join(',') : undefined,
      inStock: this.inStock ? 'true' : undefined,
      isFeatured: this.isFeatured ? 'true' : undefined,
      isFavorite: this.isFavorite ? 'true' : undefined,
    };
    if (selectedCategory) {
      filters.category = selectedCategory._id;
      filters.categoryName = selectedCategory.name;
    }
    console.log('Applying filters:', filters); 
    this.filterChange.emit(filters);
  }
}
