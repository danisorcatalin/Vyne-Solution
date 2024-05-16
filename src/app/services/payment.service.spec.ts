import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {PaymentService} from './payment.service';
import {FiltersModel} from '../models/FiltersModel';
import {environment} from "../../../environment";
import {PaymentStatus} from "../models/PaymentModel";

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });

    service = TestBed.get(PaymentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests after each test
  });

  it('should check the request URL and query parameters for getPayments', () => {
    const filters: FiltersModel = {
      page: 1,
      size: 10,
      createdAtStart: '2022-01-01',
      createdAtEnd: '2022-12-31',
      status: PaymentStatus.COMPLETED
    }

    service.getPayments(filters).subscribe();

    const req: TestRequest = httpMock.expectOne(
      `${environment.api_url}v1/payments?page=${filters.page}&size=${filters.size}&createdAtStart=${filters.createdAtStart}&createdAtEnd=${filters.createdAtEnd}&status=${filters.status}`
    );

    expect(req.request.method).toEqual('GET');
  });

  it('should handle null or empty value filters in getPayments', () => {
    const filters: FiltersModel = {
      createdAtEnd: '',
      createdAtStart: '',
      page: 0,
      size: 0,
    }
    service.getPayments(filters).subscribe();

    const req = httpMock.expectOne(`${environment.api_url}v1/payments?`); //Expecting base URL without filters
    expect(req.request.method).toEqual('GET');
  });
  it('should handle filters with only start date in getPayments', () => {
    const filters: FiltersModel = {
      createdAtStart: '2021-01-01',
      page: 0,
      size: 0,
    }
    service.getPayments(filters).subscribe();

    const req = httpMock.expectOne(`${environment.api_url}v1/payments?createdAtStart=${filters.createdAtStart}`); //Expecting base URL without filters
    expect(req.request.method).toEqual('GET');
  });
  it('should handle filters with only end date in getPayments', () => {
    const filters: FiltersModel = {
      createdAtEnd: '2021-01-01',
      page: 0,
      size: 0,
    }
    service.getPayments(filters).subscribe();

    const req = httpMock.expectOne(`${environment.api_url}v1/payments?createdAtEnd=${filters.createdAtEnd}`); //Expecting base URL without filters
    expect(req.request.method).toEqual('GET');
  });
  it('should throw error for invalid date in createdAtStart getPayments', () => {
    const filters: FiltersModel = {
      createdAtStart: '',
      createdAtEnd: '01-01-2022',
      page: 0,
      size: 0,
    }

    // Test createdAtStart
    expect(() => service.getPayments(filters))
      .toThrowError('Invalid date format for createdAtEnd. Required format is YYYY-MM-DD');
  });

  it('should throw error for invalid date in getPayments', () => {
    const filters: FiltersModel = {
      createdAtStart: 'invalid-date',
      createdAtEnd: '',
      page: 0,
      size: 0,
    }

    // Test createdAtStart
    expect(() => service.getPayments(filters))
      .toThrowError('Invalid date format for createdAtStart. Required format is YYYY-MM-DD');
  });
});
