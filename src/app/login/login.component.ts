import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../services/SecurityService";
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgOptimizedImage
  ],
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;
  errorMessage = 'Invalid Credentials';
  successMessage: string | undefined;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
  }

  handleLogin() {
   // @ts-ignore
    this.securityService.login(this.email, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
