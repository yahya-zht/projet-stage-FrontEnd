import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DemandeConge } from 'src/app/Models/DemandeConge';

@Injectable({
  providedIn: 'root',
})
export class DemandeCongeAdminService {
  REST_API: string = 'http://127.0.0.1:8000/api/admin/demande/Conge';
  REST_API_Conge: string = 'http://127.0.0.1:8000/api/conge/create';
  REST_API_Reject: string = 'http://127.0.0.1:8000/api/demande/reject';
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
  getAllDemandeConge(): Observable<DemandeConge[]> {
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeConge[]>(API_URL)
      .pipe(catchError(this.handleError));
  }
  AddConge(id: number): Observable<DemandeConge> {
    let API_URL = `${this.REST_API_Conge}/${id}`;
    return this.http
      .post<DemandeConge>(API_URL, id)
      .pipe(catchError(this.handleError));
  }
  RejectConge(id: number): Observable<DemandeConge> {
    let API_URL = `${this.REST_API_Reject}/${id}`;
    return this.http
      .post<DemandeConge>(API_URL, id)
      .pipe(catchError(this.handleError));
  }
}
