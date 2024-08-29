import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public username: string | undefined;
  public password?: string;
  public email?: string;
  public confirmPasswd?: string;
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient , private router: Router,
  ) {}
  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return <string>this.username;
  }

  register(username: string, password: string, email: string, confirmPasswd: string): Observable<string> {
    const body = { username, password, email, confirmPasswd };
    return this.http.post(`${this.apiUrl}/api/inscription`, body,{responseType:"text"}).pipe(
      tap((accessToken) => {
        localStorage.setItem("access_token",accessToken)
        setTimeout(() => {
         void this.router.navigate(['/login']);
        }, 1000);
      }),

    );
  }

  login(user: User): Observable<boolean> {
    return this.http.post<{ token: string; username: string; email: string }>(
      `${this.apiUrl}/api/login`,
      user,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 200 && response.body) {
          const { token, username } = response.body;
          localStorage.setItem('authToken', token);
          this.setUsername(username);
          return true;
        } else {
          console.error('Login failed: Response body or status is incorrect.');
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error.message, error.error);
        console.error('Error body:', error.error);
        return of(false);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
