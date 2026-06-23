import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

  isLogin = true;

  switchToLogin() {
    this.isLogin = true;
  }

  switchToRegister() {
    this.isLogin = false;
  }
}