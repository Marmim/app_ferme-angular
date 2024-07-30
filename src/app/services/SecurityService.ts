import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public name?: string;
  public password?: string;
  public email?: string;
  public confirmPasswd?: string;
  private apiUrl = environment.hostUrl;

  constructor(private http: HttpClient) {}

  register(name: string, password: string, email: string, confirmPasswd: string): Observable<any> {
    const body = { name, password, email, confirmPasswd };
    return this.http.post(`${this.apiUrl}/api/register`, body).pipe(map(res => {
      this.name = name;
      this.password = password;
      this.email = email;
      this.confirmPasswd = confirmPasswd;
      this.registerSuccessfulSignup(name, password, email, confirmPasswd);
      return res;
    }));
  }

  login(name: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/login`, {
      headers: new HttpHeaders({ authorization: this.createBasicAuthToken(name, password) })
    }).pipe(map(res => {
      this.name = name;
      this.password = password;
      this.registerSuccessfulLogin(name, password);
      return res;
    }));
  }

  createBasicAuthToken(name: string, password: string): string {
    return 'Basic ' + window.btoa(`${name}:${password}`);
  }

  registerSuccessfulLogin(name: string, password: string): void {
    this.name = name;
    this.password = password;
  }

  registerSuccessfulSignup(name: string, password: string, email: string, confirmPasswd: string): void {
    this.name = name;
    this.password = password;
    this.email = email;
    this.confirmPasswd = confirmPasswd;
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
