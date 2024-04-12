import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly REST_API = 'http://127.0.0.1:8000/api';
  private readonly token: any = this.tokenService.getAccessToken();
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<any>(`${this.REST_API}/user-profile`, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }
}
