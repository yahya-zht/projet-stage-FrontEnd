import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JarwisService } from 'src/app/services/auth/jarwis.service';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: '',
    password: '',
  };
  public error = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}
  handleResponse(date: any) {
    this.Token.handle(date.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigate(['/']);
  }
  handleError(error: any) {
    this.error = error.error.error;
  }
  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }
}
