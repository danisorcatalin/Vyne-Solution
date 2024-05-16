import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PaymentService} from "./services/payment.service";
import {PaymentsListComponent} from "./payments-list/payments-list.component";
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import {SharedService} from "./services/shared.service";
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    PaymentsListComponent,
    PaymentDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    CalendarModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [PaymentService, provideAnimationsAsync(), SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
