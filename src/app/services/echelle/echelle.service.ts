import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Echelle } from 'src/app/Models/Echelle';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class EchelleService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/echelle';
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
  AddEchelle(data: Echelle): Observable<Echelle> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Echelle>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllEchelle(): Observable<Echelle[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Echelle[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  deleteEchelle(id: number): Observable<Echelle> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Echelle>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
