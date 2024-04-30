import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Personne } from '../../Models/Personne';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TokenService } from '../auth/token.service';
@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/personne';
  private readonly REST_API_Employes = 'http://127.0.0.1:8000/api/employes';
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
  AddPersonne(data: Personne): Observable<Personne> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Personne>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllPersonnes(): Observable<Personne[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Personne[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getEmployes(): Observable<Personne[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API_Employes;
    return this.http
      .get<Personne[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getPersonneById(id: number): Observable<Personne> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    // let API_URL = this.REST_API + '/' + id;
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Personne>(API_URL, { headers }).pipe(
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
