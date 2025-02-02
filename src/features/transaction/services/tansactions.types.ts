import { Transaction } from "../../../app/types";


export interface TransactionPage {
  transactions: Transaction[];
  isTheEnd: boolean;
  page: number;
}
