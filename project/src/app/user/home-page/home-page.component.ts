import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Im
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../../userservice/product.service';
import { CategoryService } from '../../userservice/category.service';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent,CommonModule,RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  products: any;
  categories: any;
  constructor(private productService: ProductService, private categoryService: CategoryService) { }
  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories)
    });
  }
}
