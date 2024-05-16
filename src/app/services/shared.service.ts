import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaymentModel} from "../models/PaymentModel";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private paymentSource: BehaviorSubject<PaymentModel | null> = new BehaviorSubject<PaymentModel | null>(null);
  currentPayment: Observable<PaymentModel | null> = this.paymentSource.asObservable();

  constructor() { }

  changePayment(payment: PaymentModel) {
    this.paymentSource.next(payment)
  }
}
