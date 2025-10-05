import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/api'; 

  constructor(private http: HttpClient) { }


  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/read.php`).pipe(
      catchError(this.handleError)
    );
  }

  // Create new user
  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.apiUrl}/create.php`, user, { 
      headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Update user
  updateUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json' 
    });

    return this.http.put(`${this.apiUrl}/update.php`, user, { 
      headers
    }).pipe(
      catchError(this.handleError)
    );
  }


  // Delete user
  deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.request('DELETE', `${this.apiUrl}/delete.php`, { 
      headers, 
      body: { id }
    }).pipe(
      catchError(this.handleError)
    );
  }




  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('API Error Details:', error);
    
    let errorMessage = 'Unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status} - ${error.message}`;
      
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    return throwError(errorMessage);
  }
}
