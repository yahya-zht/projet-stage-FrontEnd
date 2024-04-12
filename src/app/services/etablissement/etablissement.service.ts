import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Etablissement } from 'src/app/Models/Etablissement';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class EtablissementService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/etablissement';
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
  AddEtablissement(data: Etablissement): Observable<Etablissement> {
    let API_URL = this.REST_API;
    return this.http
      .post<Etablissement>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllEtablissement(): Observable<Etablissement[]> {
    const token: any = this.tokenService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let API_URL = this.REST_API;
    return this.http
      .get<Etablissement[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getEtablissementById(id: number): Observable<Etablissement> {
    const token: any = this.tokenService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Etablissement>(API_URL, { headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateEtablissement(
    id: number,
    data: Etablissement
  ): Observable<Etablissement> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<Etablissement>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deleteEtablissement(id: number): Observable<Etablissement> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Etablissement>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
