import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'userEmail';
  constructor() { }
  setEmail(email: string): void {
    localStorage.setItem(this.storageKey, email);
  }
  getEmail(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}
