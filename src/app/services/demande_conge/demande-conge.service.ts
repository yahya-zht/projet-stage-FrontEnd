import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DemandeConge } from 'src/app/Models/DemandeConge';

@Injectable({
  providedIn: 'root',
})
export class DemandeCongeService {
  REST_API: string = 'http://127.0.0.1:8000/api/demande/Conge';
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
  AddDemandeConge(data: DemandeConge): Observable<DemandeConge> {
    let API_URL = this.REST_API;
    return this.http
      .post<DemandeConge>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllDemandeConge(): Observable<DemandeConge[]> {
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeConge[]>(API_URL)
      .pipe(catchError(this.handleError));
  }
  getDemandeCongeById(id: number): Observable<DemandeConge> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<DemandeConge>(API_URL).pipe(
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
