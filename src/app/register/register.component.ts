import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SecurityService} from "../services/SecurityService";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPasswd: string = '';
  errorMessage: string = '';

  constructor(private securityService: SecurityService, private router: Router) {}

  handleRegister() {
    if (this.password !== this.confirmPasswd) {
      this.errorMessage = 'Les mots de passes ne sont pas identiques';
      return;
    }
    this.securityService.register(this.name, this.password, this.email, this.confirmPasswd)
    this.router.navigate(['/inscription']);

  }
}
