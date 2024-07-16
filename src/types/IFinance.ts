export type Account = {
  name: string;
  tag: string;
  balance: number;
};

export type Transaction = {
  id: number;
  date: string;
  account: string;
  category: string;
  description: string;
  value: number;
};

export type Debt = {
  id: number;
  description: string;
  creditor: string;
  value: number;
  cet: number;
  monthly_installment: number;
  outstanding_installments: number;
};