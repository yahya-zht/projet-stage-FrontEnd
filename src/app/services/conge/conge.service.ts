import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Conge } from 'src/app/Models/Conge';

@Injectable({
  providedIn: 'root',
})
export class CongeService {
  REST_API: string = 'http://127.0.0.1:8000/api/conge';
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
  AddConge(data: Conge): Observable<Conge> {
    let API_URL = this.REST_API;
    return this.http
      .post<Conge>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllConge(): Observable<Conge[]> {
    let API_URL = this.REST_API;
    return this.http.get<Conge[]>(API_URL).pipe(catchError(this.handleError));
  }
  getCongeById(id: number): Observable<Conge> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Conge>(API_URL).pipe(
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
