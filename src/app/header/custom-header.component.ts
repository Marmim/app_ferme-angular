import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SecurityService} from "../services/SecurityService";
import {User} from "../models/User";
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'app-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent  implements OnInit{
  currentUser: User | undefined;
  email: string | null = null;
  @Input() sidebarId = 'sidebar';
  constructor(
    private securityService: SecurityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const email = this.authService.getEmail();

    if (email) {
      this.securityService.getUserByEmail(email).subscribe({
        next: (user: User) => this.currentUser = user,
        error: (err) => console.error('Erreur lors de la récupération de l’utilisateur', err)
      });
    } else {
      console.error('Email de l’utilisateur non disponible');
    }
  }

  handleLogout(): void {
    this.securityService.logout();
  }
}
