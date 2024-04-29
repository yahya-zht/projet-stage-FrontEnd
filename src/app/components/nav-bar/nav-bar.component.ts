import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, window } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public Role = '';
  public loggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private Token: TokenService
  ) {}
  ngOnInit(): void {
    this.authService.authStatus.subscribe((value) => (this.loggedIn = value));
    this.Role = this.authService.getUserRole();
  }
  logout(event: MouseEvent): void {
    event.preventDefault();
    this.Token.remove();
    this.authService.logout();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
}
