import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Etablissement } from 'src/app/Models/Etablissement';

@Injectable({
  providedIn: 'root',
})
export class EtablissementService {
  REST_API: string = 'http://127.0.0.1:8000/api/etablissement';
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
  AddEtablissement(data: Etablissement): Observable<Etablissement> {
    let API_URL = this.REST_API;
    return this.http
      .post<Etablissement>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllEtablissement(): Observable<Etablissement[]> {
    let API_URL = this.REST_API;
    return this.http
      .get<Etablissement[]>(API_URL)
      .pipe(catchError(this.handleError));
  }
  getEtablissementById(id: number): Observable<Etablissement> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Etablissement>(API_URL).pipe(
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
