import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SecurityService} from "../services/SecurityService";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../models/User";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private securityService: SecurityService, private router: Router) {}

  handleLogin() {
    const user: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      farms: []
    };

    this.securityService.login(user).subscribe(
      success => {
        if (success) {
          this.successMessage = 'Connexion réussie !';
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/map']);
          }, 1000);
        } else {
          this.successMessage = null;
          this.errorMessage = 'Identifiants incorrects.';
        }
      }
    );
  }


}
