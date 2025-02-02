
import mockTransactions1 from './mockTransactions1.json';
import mockTransactions2 from './mockTransactions2.json';

import { TransactionPage } from './tansactions.types';

// Simulates fetching transactions from an API
export const fetchTransactions = (page: number): Promise<TransactionPage> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (page === 1) {
        // @ts-ignore
        resolve({ transactions: mockTransactions1, isTheEnd: false, page: 1 });
      } else if (page === 2) {
        // @ts-ignore
        resolve({ transactions: mockTransactions2, isTheEnd: true, page: 2 });
      } else {
        // @ts-ignore
        resolve({ transactions: [], isTheEnd: true, page: -1 });
      }
    }, 3000); // Simulated delay
  });
};
