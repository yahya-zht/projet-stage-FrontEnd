import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  public userRole = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  canActivate(): boolean {
    this.userRole = this.authService.getUserRole();
    console.log('RoleGuard', this.userRole);
    const userRole = this.userRole;
    if (userRole === 'admin' || userRole === 'Directeur') {
      return true;
    } else {
      this.router.navigate(['/accueil']);
      return false;
    }
  }
}
