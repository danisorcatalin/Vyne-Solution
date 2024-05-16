import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {PaginationModel} from "../models/PaginationModel";
import {environment} from "../../../environment";
import {FiltersModel} from "../models/FiltersModel";


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = environment.api_url + 'v1/payments';  // update with your API endpoint

  constructor(private http: HttpClient) { }

  getPayments(filters: FiltersModel) : Observable<PaginationModel> {
    let params: URLSearchParams = new URLSearchParams();

    if (filters.page) {
      params.append('page', String(filters.page));
    }
    if (filters.size) {
      params.append('size', String(filters.size));
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (filters.createdAtStart && !dateRegex.test(filters.createdAtStart)) {
      throw new Error('Invalid date format for createdAtStart. Required format is YYYY-MM-DD');
    }

    if (filters.createdAtEnd && !dateRegex.test(filters.createdAtEnd)) {
      throw new Error('Invalid date format for createdAtEnd. Required format is YYYY-MM-DD');
    }
    if (filters.createdAtStart) {
      params.append('createdAtStart', filters.createdAtStart);
    }
    if (filters.createdAtEnd) {
      params.append('createdAtEnd', filters.createdAtEnd);
    }
    if (filters.status) {
      params.append('status', filters.status);
    }




    const requestUrl = `${this.apiUrl}?${params.toString()}`;
    return this.http.get<any>(requestUrl).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  handleError(error: any) {
    console.error('An error occurred', error);  // for demo purposes only
    return throwError(error);
  }
}
