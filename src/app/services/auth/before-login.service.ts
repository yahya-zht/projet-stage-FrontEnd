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
@Injectable({
  providedIn: 'root',
})
export class BeforeLoginService implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): | boolean| UrlTree| Observable<boolean | UrlTree>| Promise<boolean | UrlTree> {return !this.Token.loggedIn(); }
  // constructor(private Token: TokenService, private router: Router) {

  // }
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenService.loggedIn()) {
      return this.router.parseUrl('/Accueil');
    }
    return true;
  }
}
