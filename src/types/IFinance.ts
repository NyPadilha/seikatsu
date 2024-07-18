export type AccountTag = "cash" | "bank" | "credit";

export type Account = {
  name: string;
  tag: AccountTag;
  balance: number;
};

export type CategoryTag = "income" | "expense";

export type Category = {
  name: string;
  tag: string;
};

export type Creditor = {
  name: string;
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