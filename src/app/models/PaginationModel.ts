import {PaymentModel} from "./PaymentModel";

export interface PaginationModel {
  currentPage: number;
  hasNext: boolean;
  numberOfPages: number;
  items: PaymentModel[];
  pageSize: number;
  totalNumberOfItems: number;
}
