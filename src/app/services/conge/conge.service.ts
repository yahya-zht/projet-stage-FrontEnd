import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Conge } from 'src/app/Models/Conge';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class CongeService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/conge';
  private readonly REST_API_Respnsable =
    'http://127.0.0.1:8000/api/conge/responsable';
  private readonly REST_API_Directeur =
    'http://127.0.0.1:8000/api/conge/directeur';
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
  AddConge(data: Conge): Observable<Conge> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Conge>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllConge(): Observable<Conge[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Conge[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getCongeForResponsable(): Observable<Conge[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API_Respnsable;
    return this.http
      .get<Conge[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getCongeForDirecteur(): Observable<Conge[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API_Directeur;
    return this.http
      .get<Conge[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getCongeById(id: number): Observable<Conge> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Conge>(API_URL, { headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateConge(id: number, data: Conge): Observable<Conge> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<Conge>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deleteConge(id: number): Observable<Conge> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Conge>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
