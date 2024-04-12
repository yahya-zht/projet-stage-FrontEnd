import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DemandeConge } from 'src/app/Models/DemandeConge';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class DemandeCongeService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/demande/Conge';
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
  AddDemandeConge(data: DemandeConge): Observable<DemandeConge> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<DemandeConge>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllDemandeConge(): Observable<DemandeConge[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeConge[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getDemandeCongeById(id: number): Observable<DemandeConge> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<DemandeConge>(API_URL, { headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateDemandeConge(id: number, data: DemandeConge): Observable<DemandeConge> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<DemandeConge>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deleteDemandeConge(id: number): Observable<DemandeConge> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<DemandeConge>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
