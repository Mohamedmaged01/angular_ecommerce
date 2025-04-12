import { Component } from '@angular/core';
import{HeaderComponent} from '../header/header.component'
import{FilterComponent} from '../filter/filter.component'
import{FooterComponent} from '../footer/footer.component'
import{ProductGridComponent} from '../product-grid/product-grid.component'

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HeaderComponent,FilterComponent,FooterComponent,ProductGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  receivedSearch = '';

  handleSearch(query: string) {
    this.receivedSearch = query;
  }
  currentFilters: any = {};

  onFilterChange(filters: any) {
    console.log('Received filters in HomeComponent:', filters); 
    this.currentFilters = { ...filters }; 
  }
}
