import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccueilService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/accueil';
  private readonly token: any = this.tokenService.getAccessToken();
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  getAccueilEmployee(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<any>(`${this.REST_API}/employee`, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  getAccueilDirecteur(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<any>(`${this.REST_API}/directeur`, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  getAccueilAdmin(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<any>(`${this.REST_API}/admin`, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
