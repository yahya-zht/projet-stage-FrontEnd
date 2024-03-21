import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';

@Injectable({
  providedIn: 'root',
})
export class DemandeAbsenceAdminService {
  REST_API: string = 'http://127.0.0.1:8000/api/admin/demande/Absence';
  REST_API_Conge: string = 'http://127.0.0.1:8000/api/absence/create';
  REST_API_Reject: string = 'http://127.0.0.1:8000/api/demande/absence/reject';
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
  getAllDemandeAbsence(): Observable<DemandeAbsence[]> {
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeAbsence[]>(API_URL)
      .pipe(catchError(this.handleError));
  }
  AddAbsence(id: number): Observable<DemandeAbsence> {
    let API_URL = `${this.REST_API_Conge}/${id}`;
    return this.http
      .post<DemandeAbsence>(API_URL, id)
      .pipe(catchError(this.handleError));
  }
  RejectAbsence(id: number): Observable<DemandeAbsence> {
    let API_URL = `${this.REST_API_Reject}/${id}`;
    return this.http
      .post<DemandeAbsence>(API_URL, id)
      .pipe(catchError(this.handleError));
  }
}
