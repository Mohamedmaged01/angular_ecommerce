import { Component, computed, effect, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
=======
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { LoginService } from './userservices/login.service'; 

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
})
export class AppComponent {
  isAuthorized = false;

  ngOnInit(): void {
    this.checkUserAuthorization();
  }

  checkUserAuthorization(): void {
<<<<<<< HEAD
    const token = localStorage.getItem('token');
=======
    const token = localStorage.getItem('token'); 
>>>>>>> cfc778f37f364fcf7db95d5992eaaf16feec3956
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email === 'mostafamokna78@gmail.com') {
          this.isAuthorized = true;
        }
      } catch (error) {
        console.error('Invalid token format', error);
      }
    }
  }
}
