import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}
  getUserProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user-profile`, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
