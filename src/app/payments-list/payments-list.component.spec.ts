import {ComponentFixture, TestBed} from '@angular/core/testing';

import { PaymentsListComponent } from './payments-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSelectModule} from "@angular/material/select";
import {CalendarModule} from "primeng/calendar";
import {By} from "@angular/platform-browser";

describe('PaymentsListComponent', () => {
  let component: PaymentsListComponent;
  let fixture: ComponentFixture<PaymentsListComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsListComponent ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no data message when payments is empty', () => {
    component.payments = []; // Set the payments to an empty array.
    fixture.detectChanges(); // Trigger change detection cycle for the component.

    // Find the no data message from the DOM using a CSS query.
    const noDataMessageElement = fixture.debugElement.query(By.css('[data-test="no-data-message"]'));

    // Check that it is not null and its content is correct.
    expect(noDataMessageElement).toBeTruthy();
    expect(noDataMessageElement.nativeElement.textContent).toContain('There is no data to display');
  });
});
