
import { SortType, Transaction } from "../types";

export const getFilteredTransactions = (transactions: Transaction[], filterStatus: string) => {
  return transactions ? transactions.filter(transaction => filterStatus === 'all' || transaction.status === filterStatus) : [];
};

export const getSortedTransactions = (transactions: Transaction[], sortType: SortType) => {
  return transactions ? [...transactions].sort((a, b) => {
    if (sortType === 'High to Low') return b.amount - a.amount;
    if (sortType === 'Low to High') return a.amount - b.amount;
    if (sortType === 'Newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortType === 'Oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    return 0;
  }) : [];
};