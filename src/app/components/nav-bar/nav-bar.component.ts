import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public loggedIn: boolean = false;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) {}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));
  }
  logout(event: MouseEvent): void {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
}
