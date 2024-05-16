import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PaymentService} from "../services/payment.service";
import {PaymentModel, PaymentStatus} from "../models/PaymentModel";
import {TableLazyLoadEvent} from "primeng/table";
import {PaginationModel} from "../models/PaginationModel";
import {FiltersModel} from "../models/FiltersModel";
import {finalize, Subscription} from "rxjs";
import {HeaderModel, ModelProp} from "../models/ModelProp";
import {Router} from "@angular/router";
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PaymentsListComponent implements OnInit, OnDestroy{

  readonly paymentStatusKeys: string[] = Object.keys(PaymentStatus) as string[];
  payments: PaymentModel[] = [];
  loading: boolean = false;
  dateRange: Date[] = [];
  totalRecords: number = 0;
  filterTimeoutId: ReturnType<typeof setTimeout> | null = null;
  filters: FiltersModel = {} as FiltersModel;
  modelProps: ModelProp[] = new HeaderModel().modelProps;

  private subscription: Subscription | undefined;

constructor(private paymentService: PaymentService,
            private cdr: ChangeDetectorRef,
            private sharedService: SharedService,
            private router: Router) {
}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    let today: Date = new Date();
    let yesterday: Date = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    this.dateRange = [yesterday, today];
  }

  triggerFilter() {
    this.filterTimeoutId = this.handleFilterTimeout(this.filterTimeoutId);
  }

  loadPayments(event?: TableLazyLoadEvent) {
    this.loading = true;
    this.cdr.detectChanges();

    this.calculateCurrentPage(event);
    this.applyDateRangeFilters();

    this.subscription = this.paymentService.getPayments(this.filters)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res: PaginationModel) => {
          this.payments = res.items;
          this.cdr.detectChanges();
          this.totalRecords = res.totalNumberOfItems;
        },
        error: error => console.log(error)
      });
  }

  getPaymentStatusByKey(key: string): PaymentStatus {
    return PaymentStatus[key as keyof typeof PaymentStatus];
  }

  private handleFilterTimeout(previousTimeoutId: ReturnType<typeof setTimeout> | null): ReturnType<typeof setTimeout> | null {
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    return setTimeout(() => {
      this.loadPayments();
      return null;
    }, 250);
  }

  private calculateCurrentPage(event?: TableLazyLoadEvent): void {
    if (!event || event.first == null || event.rows == null) return;

    this.filters.page = event.first / (event.rows ?? 1);
  }

  viewDetails(payment: PaymentModel) {
    this.sharedService.changePayment(payment);
    this.router.navigate(['/payment-details']);
  }

  private applyDateRangeFilters(): void {
    if (!this.dateRange) return;

    const [start, end] = this.dateRange.map(date => date?.toISOString().slice(0,10));
    this.filters = { ...this.filters, createdAtStart: start ?? "", createdAtEnd: end ?? "" };
  }
}
