import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const TAG = 'ConnectionService';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) {
    console.log(TAG, 'constructor');
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  handleError(error: HttpErrorResponse) {
    console.log(TAG, 'handleError');
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  executeGet(endPoint: string): Observable<any> {
    console.log(TAG, 'executeGet');
    return this.httpClient.get<any>(endPoint)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
