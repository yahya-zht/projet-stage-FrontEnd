import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/auth/jarwis.service';
import { TokenService } from 'src/app/services/auth/token.service';

interface ErrorMessages {
  name?: string[];
  password?: string[];
  email?: string[];
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  public form = {
    CIN: null,
    email: null,
    password: null,
    password_confirmation: null,
  };
  public error: ErrorMessages = {};
  handleError(error: any): void {
    this.error = error.error.errors;
  }
  handleResponse(date: any) {
    this.Token.handle(date.access_token);
    this.router.navigateByUrl('/');
  }
  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => {
        this.handleError(error);
        console.log(this.error);
      }
    );
  }
}
