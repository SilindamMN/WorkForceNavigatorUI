import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthserviceService } from '../../services/auth.service';
import { UserRegister } from '../../models/auth/register';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/auth/login';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

  registerUser: UserRegister = new UserRegister();
  loginUser : UserLogin = new UserLogin();
  authService= inject(AuthserviceService);
  router = inject(Router);
  isLogin = true;

  switchToLogin() {
    this.isLogin = true;
  }

  switchToRegister() {
    this.isLogin = false;
  }
  RegisterUser(){
    this.authService.Register(this.registerUser).subscribe(
      (response) => {
        (response.status === 200) ? this.isLogin = true : alert(response.statusText);
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  LoginUser() {
    this.authService.Login(this.loginUser).subscribe(
      (response) => {
        this.authService.saveAuthData(response);     
        this.router.navigate(['']);
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
}