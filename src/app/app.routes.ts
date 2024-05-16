import { Routes } from '@angular/router';
import {PaymentsListComponent} from "./payments-list/payments-list.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: 'payments', component: PaymentsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment-details', component: PaymentDetailsComponent },
  { path: '', redirectTo: '/payments', pathMatch: 'full' },
];
