import { Injectable } from '@angular/core';
import {LoginModel} from "../models/LoginModel";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = environment.api_url
  constructor(private http: HttpClient) { }

  loginUser(user: LoginModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);

    return throwError( ()=>
      'Something bad happened; please try again later.');
  }
}
