import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Personne } from '../Models/Personne';
import { Observable, catchError, map, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  REST_API: string = 'http://127.0.0.1:8000/api/personne';
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
  AddPersonne(data: Personne): Observable<Personne> {
    let API_URL = this.REST_API;
    return this.http
      .post<Personne>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllPersonnes(): Observable<Personne[]> {
    let API_URL = this.REST_API;
    return this.http
      .get<Personne[]>(API_URL)
      .pipe(catchError(this.handleError));
  }
  getPersonneById(id: number): Observable<Personne> {
    // let API_URL = this.REST_API + '/' + id;
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Personne>(API_URL).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updatePersonne(id: number, data: Personne): Observable<Personne> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<Personne>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deletePersonne(id: number): Observable<Personne> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Personne>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
