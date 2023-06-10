import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, retry, throwError} from "rxjs";
import {Report} from "../../../interfaces/report";
import {Cuota} from "../../../interfaces/cuota";

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  // Reports Endpoint
  basePath = 'http://localhost:3000/api/v1/cuota';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  // Create Student
  create(item: any): Observable<Cuota> {
    return this.http.post<Cuota>(
        this.basePath,
        JSON.stringify(item),
        this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  // Get Student by id
  getById(id: any): Observable<Cuota> {
    return this.http.get<Cuota>(
        `${this.basePath}/${id}`,
        this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  // Get All Students
  getAll(): Observable<Cuota> {
    return this.http.get<Cuota>(this.basePath, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Student
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // Update Student
  update(id: any, item: any): Observable<Cuota> {
    return this.http.put<Cuota>(`${this.basePath}/${id}`,
        JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // getLastId(data1: any): Observable<number> {
  //   // Supongamos que tienes una lista de objetos con la propiedad 'id'
  //   const data: any[] = [
  //     { id: 1, ... },
  //     { id: 2, ... },
  //     { id: 3, ... },
  //     // ...
  //   ];
  //
  //   // Utiliza el método 'reduce' para obtener el máximo ID de la lista
  //   const lastId = data1.reduce((maxId, obj) => {
  //     return obj.id > maxId ? obj.id : maxId;
  //   }, 0);
  //
  //   // Retorna el último ID como un observable
  //   return of(lastId);
  // }



}
