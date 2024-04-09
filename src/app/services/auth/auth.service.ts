import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userRole: string = '';
  constructor(private Token: TokenService) {}
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
  setUserRole(role: string) {
    this.userRole = role;
  }
  getUserRole() {
    return this.userRole;
  }
}
