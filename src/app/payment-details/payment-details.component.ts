import {Component, OnDestroy, OnInit} from '@angular/core';
import { PaymentModel } from '../models/PaymentModel';
import {SharedService} from "../services/shared.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  payment!: PaymentModel | null;
  private subscription: Subscription | undefined;

  constructor(private sharedService: SharedService, private router: Router) {
    this.sharedService.currentPayment.subscribe(payment => this.payment = payment)
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    if (!this.payment || Object.values(this.payment).some(x => x === null || x === undefined)) {
      this.router.navigate(['/payments']);
    }
  }

}
