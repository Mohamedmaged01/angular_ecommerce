import { Component  ,Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import{HeaderComponent} from '../header/header.component';
import{FooterComponent}   from  '../footer/footer.component' ;
import { HttpClient } from '@angular/common/http';
import{ProductService} from '../../userservice/product.service';
@Component({
  selector: 'app-detailes',
  imports: [HeaderComponent ,FooterComponent],
  templateUrl: './detailes.component.html',
  styleUrl: './detailes.component.css'
})
export class DetailesComponent implements OnInit,OnChanges {
  @Input() id!: string; 
  products: any[] = [];
  product: any;

  constructor(private http: HttpClient ,private productService:ProductService) { }

  ngOnInit() {
  
this.loadProductById(this.id);


  }
 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      console.log('ID changed in Detailes:', this.id);
      this.loadProductById(this.id);
    }
  }

  loadProductById(id: string) {
    this.productService.getproductById(id).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (response.success) {
          this.product = response.data || {};
          console.log(this.product);
        } else {
          this.product = null;
        }
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.product = null;
      }
    });


}
}
