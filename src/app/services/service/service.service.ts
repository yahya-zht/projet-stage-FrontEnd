import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Service } from 'src/app/Models/Service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  REST_API: string = 'http://127.0.0.1:8000/api/service';
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
  AddService(data: Service): Observable<Service> {
    let API_URL = this.REST_API;
    return this.http
      .post<Service>(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  getAllService(token: string): Observable<Service[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let API_URL = this.REST_API;
    return this.http
      .get<Service[]>(API_URL, { headers })
      .pipe(catchError(this.handleError));
  }
  getServiceById(id: number): Observable<Service> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get<Service>(API_URL).pipe(
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
