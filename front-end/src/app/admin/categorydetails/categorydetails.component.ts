import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categorydetails',
  imports: [SidebarComponent,RouterLink],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css'
})
export class CategorydetailsComponent {

}
