import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Grade } from 'src/app/Models/Grade';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  REST_API: string = 'http://127.0.0.1:8000/api/grade';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  AddGrade(data: Grade): Observable<Grade> {
    let API_URL = this.REST_API;
    return this.http
      .post<Grade>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllGrade(): Observable<Grade[]> {
    let API_URL = this.REST_API;
    return this.http.get<Grade[]>(API_URL).pipe(catchError(this.handleError));
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
