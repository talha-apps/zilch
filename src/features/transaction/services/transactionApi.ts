import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchTransactions } from './transactionService';
import { TransactionPage } from './tansactions.types';

// Create a fake API with local mock data
export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: async ({ page }) => {
    const data: TransactionPage = await fetchTransactions(page);
    return { data };
  },
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionPage, number>({
      query: (page) => ({ page }),
      transformResponse: (response: TransactionPage, meta, arg) => {
        // Store the fetched pages incrementally in the state
        return response;
      },
      merge: (currentCache, newItems) => {
        // Merge new items with the current cache
        currentCache.transactions.push(...newItems.transactions);
        currentCache.isTheEnd = newItems.isTheEnd;
      }
    })
  })
});

export const { useGetTransactionsQuery } = transactionApi;
