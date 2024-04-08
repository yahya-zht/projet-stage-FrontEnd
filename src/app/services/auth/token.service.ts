import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private iss = {
    login: 'http://127.0.0.1:8000/api/login',
    signup: 'http://127.0.0.1:8000/api/signup',
  };
  constructor() {}
  handle(token: string) {
    this.set(token);
    // console.log(this.payload(token));
    console.log(this.isValid());
  }
  set(token: string) {
    localStorage.setItem('token', token);
    // localStorage.setItem('token', JSON.stringify(token));
  }
  get() {
    return localStorage.getItem('token');
  }
  remove() {
    localStorage.removeItem('token');
  }
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }
  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload: string) {
    return JSON.parse(atob(payload));
  }
  loggedIn() {
    return this.isValid();
  }
}
