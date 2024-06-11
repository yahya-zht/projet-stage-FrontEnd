import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private readonly ROLE_KEY = 'Lld$sqz';
  private readonly SECRET_KEY = '$12@.iAT99-<>$@Z';
  constructor(private Token: TokenService, private http: HttpClient) {}
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
  logout() {
    window.location.reload();
    return this.http.get<string>(`${this.baseUrl}/logout`);
  }
  setUserRole(role: string): void {
    console.log('userRole=>', role);
    const encryptedRole = CryptoJS.AES.encrypt(
      role.trim(),
      this.SECRET_KEY
    ).toString();
    localStorage.setItem(this.ROLE_KEY, encryptedRole);
  }
  getUserRole(): string {
    const encryptedRole = localStorage.getItem(this.ROLE_KEY);
    if (encryptedRole) {
      const decryptedBytes = CryptoJS.AES.decrypt(
        encryptedRole,
        this.SECRET_KEY
      );
      return decryptedBytes.toString(CryptoJS.enc.Utf8);
    }
    return '';
  }
}
