import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SecurityService} from "../services/SecurityService";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPasswd: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private securityService: SecurityService, private router: Router) {
  }

  handleRegister() {
    if (this.password !== this.confirmPasswd) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.successMessage = null;
      return;
    }

    this.securityService.register(this.username, this.password, this.email, this.confirmPasswd).subscribe(
      response => {
        this.successMessage = 'Enregistrement réussi.';
        this.errorMessage = null;
      },
      error => {
        // Handle error response
        if (error.status === 409) {
          this.errorMessage = 'Le nom d\'utilisateur ou l\'email est déjà utilisé.';
        } else {
          this.errorMessage = 'Une erreur s\'est produite lors de l\'enregistrement. Veuillez réessayer.';
        }
        this.successMessage = null;
      }
    );
  }
}

