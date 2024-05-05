import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Service } from 'src/app/Models/Service';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private readonly REST_API = 'http://127.0.0.1:8000/api/service';
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
  AddService(data: Service): Observable<Service> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .post<Service>(API_URL, data, { headers })
      .pipe(catchError(this.handleError));
  }
  getAllService(): Observable<Service[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = this.REST_API;
    return this.http
      .get<Service[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getServicesForEtablissement(): Observable<Service[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API}/directeur`;
    return this.http
      .get<Service[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getServiceById(id: number): Observable<Service> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Service>(API_URL, { headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateService(id: number, data: Service): Observable<Service> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .put<Service>(API_URL, data, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
  deleteService(id: number): Observable<Service> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http
      .delete<Service>(API_URL, {
        headers: this.httpHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
