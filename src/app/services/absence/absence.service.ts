import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Absence } from 'src/app/Models/Absence';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/absence';
  private readonly token: any = this.tokenService.getAccessToken();
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = error.error;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  AddAbsence(data: Absence): Observable<Absence> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Absence>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllAbsence(): Observable<Absence[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Absence[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getAbsenceById(id: number): Observable<Absence> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Absence>(API_URL, { headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateAbsence(id: number, data: Absence): Observable<Absence> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<Absence>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deleteAbsence(id: number): Observable<Absence> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Absence>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
