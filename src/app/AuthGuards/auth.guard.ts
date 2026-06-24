import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthserviceService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.auth.isLoggedIn()
      ? true
      : this.router.createUrlTree(['/login']);
  }
}