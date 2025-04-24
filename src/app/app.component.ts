import { Component, computed, effect, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  isAuthorized = false;

  ngOnInit(): void {
    this.checkUserAuthorization();
  }

  checkUserAuthorization(): void {
    const token = localStorage.getItem('token');
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
