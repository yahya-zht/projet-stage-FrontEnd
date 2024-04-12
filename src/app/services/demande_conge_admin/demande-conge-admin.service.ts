import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DemandeConge } from 'src/app/Models/DemandeConge';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class DemandeCongeAdminService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/admin/demande/Conge';
  private readonly REST_API_Conge = 'http://127.0.0.1:8000/api/conge/create';
  private readonly REST_API_Reject =
    'http://127.0.0.1:8000/api/demande/conge/reject';
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
  getAllDemandeConge(): Observable<DemandeConge[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<DemandeConge[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  AddConge(id: number): Observable<DemandeConge> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API_Conge}/${id}`;
    return this.http
      .post<DemandeConge>(API_URL, id, { headers })
      .pipe(catchError(this.handleError));
  }
  RejectConge(id: number): Observable<DemandeConge> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API_Reject}/${id}`;
    return this.http
      .post<DemandeConge>(API_URL, id, { headers })
      .pipe(catchError(this.handleError));
  }
}
