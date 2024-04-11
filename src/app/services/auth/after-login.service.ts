import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AfterLoginService implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):| boolean| UrlTree| Observable<boolean | UrlTree>| Promise<boolean | UrlTree> { return this.Token.loggedIn();
  // }
  // constructor(private Token: TokenService, private router: Router) {
  //   this.router.navigateByUrl('/login');
  // }
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
