import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Grade } from 'src/app/Models/Grade';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/grade';
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
  AddGrade(data: Grade): Observable<Grade> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Grade>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllGrade(): Observable<Grade[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Grade[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  deleteGrade(id: number): Observable<Grade> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Grade>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
