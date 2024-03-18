import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Absence } from 'src/app/Models/Absence';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  REST_API: string = 'http://127.0.0.1:8000/api/absence';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
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
    let API_URL = this.REST_API;
    return this.http
      .post<Absence>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllAbsence(): Observable<Absence[]> {
    let API_URL = this.REST_API;
    return this.http.get<Absence[]>(API_URL).pipe(catchError(this.handleError));
  }
  getAbsenceById(id: number): Observable<Absence> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Absence>(API_URL).pipe(
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
