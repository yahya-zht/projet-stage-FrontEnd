import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class DemandeAbsenceService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/demande/Absence';
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
  AddDemandeAbsence(data: DemandeAbsence): Observable<DemandeAbsence> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<DemandeAbsence>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllDemandeAbsence(): Observable<DemandeAbsence[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeAbsence[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getDemandeAbsenceById(id: number): Observable<DemandeAbsence> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<DemandeAbsence>(API_URL, { headers }).pipe(
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
