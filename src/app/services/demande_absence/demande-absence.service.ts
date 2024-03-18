import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';

@Injectable({
  providedIn: 'root',
})
export class DemandeAbsenceService {
  REST_API: string = 'http://127.0.0.1:8000/api/demande/Absence';
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
  AddDemandeAbsence(data: DemandeAbsence): Observable<DemandeAbsence> {
    let API_URL = this.REST_API;
    return this.http
      .post<DemandeAbsence>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllDemandeAbsence(): Observable<DemandeAbsence[]> {
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeAbsence[]>(API_URL)
      .pipe(catchError(this.handleError));
  }
  getDemandeAbsenceById(id: number): Observable<DemandeAbsence> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<DemandeAbsence>(API_URL).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateDemandeAbsence(
    id: number,
    data: DemandeAbsence
  ): Observable<DemandeAbsence> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<DemandeAbsence>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deleteDemandeAbsence(id: number): Observable<DemandeAbsence> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<DemandeAbsence>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
