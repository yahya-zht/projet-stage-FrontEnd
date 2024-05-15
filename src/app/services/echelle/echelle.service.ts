import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Echelle } from 'src/app/Models/Echelle';

@Injectable({
  providedIn: 'root',
})
export class EchelleService {
  REST_API: string = 'http://127.0.0.1:8000/api/echelle';
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
  AddEchelle(data: Echelle): Observable<Echelle> {
    let API_URL = this.REST_API;
    return this.http
      .post<Echelle>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllEchelle(): Observable<Echelle[]> {
    let API_URL = this.REST_API;
    return this.http.get<Echelle[]>(API_URL).pipe(catchError(this.handleError));
  }
  deleteEchelle(id: number): Observable<Echelle> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Echelle>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  getEchelleById(id: number): Observable<Echelle> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Echelle>(API_URL).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateEchelle(id: number, data: Echelle): Observable<Echelle> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<Echelle>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
