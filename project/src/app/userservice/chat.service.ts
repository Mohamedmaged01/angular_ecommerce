import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/chat'; 

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    return this.http
      .post(this.apiUrl, { message })
      .pipe(
        catchError((error) => {
          console.error('ChatService error:', error);
          return throwError(() => error);
        })
      );
  }
}
