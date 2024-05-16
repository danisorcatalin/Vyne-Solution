export enum PaymentStatus {
  CAPTURED = 'CAPTURED',
  COMPLETED = 'COMPLETED',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  SETTLED = 'SETTLED'
}

export interface PaymentModel {
  amount: number;
  createdAt: Date;
  currency: string;
  description: string;
  id: string;
  status: PaymentStatus;
}
