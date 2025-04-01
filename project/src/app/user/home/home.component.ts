import { Component } from '@angular/core';
import{HeaderComponent} from '../header/header.component'
import{FilterComponent} from '../filter/filter.component'
import{FooterComponent} from '../footer/footer.component'
@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FilterComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
