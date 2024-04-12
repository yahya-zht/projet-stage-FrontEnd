import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Fonction } from 'src/app/Models/Fonction';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class FonctionService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/fonction';
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
  AddFonction(data: Fonction): Observable<Fonction> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Fonction>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllFonction(): Observable<Fonction[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Fonction[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  deleteFonction(id: number): Observable<Fonction> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Fonction>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
