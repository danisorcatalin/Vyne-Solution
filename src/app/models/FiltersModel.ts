import {PaymentStatus} from "./PaymentModel";

export interface FiltersModel {
  createdAtEnd?: string;
  createdAtStart?: string;
  page: number;
  size: number;
  status?: PaymentStatus;
}
