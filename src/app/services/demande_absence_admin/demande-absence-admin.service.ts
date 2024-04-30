import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DemandeAbsence } from 'src/app/Models/DemandeAbsence';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class DemandeAbsenceAdminService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/admin/demande/Absence';
  private readonly REST_API_Absence =
    'http://127.0.0.1:8000/api/absence/create';
  private readonly REST_API_Reject =
    'http://127.0.0.1:8000/api/demande/absence/reject';
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
  AddAbsence(id: number): Observable<DemandeAbsence> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API_Absence}/${id}`;
    return this.http
      .post<DemandeAbsence>(API_URL, id, { headers })
      .pipe(catchError(this.handleError));
  }
  RejectAbsence(id: number): Observable<DemandeAbsence> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API_Reject}/${id}`;
    return this.http
      .post<DemandeAbsence>(API_URL, id, { headers })
      .pipe(catchError(this.handleError));
  }
}
