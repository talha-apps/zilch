import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Transaction } from '../../../app/types';


interface TransactionState {
  selectedTransaction: Transaction | null;
}

const initialState: TransactionState = {
  selectedTransaction: null
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSelectedTransaction: (state, action: PayloadAction<Transaction | null>) => {
      state.selectedTransaction = action.payload;
    }
  }
});

export const { setSelectedTransaction } = transactionSlice.actions;

// Selectors for extracting data from Redux state
export const selectSelectedTransaction = (state: RootState) => state.transactions.selectedTransaction;
export default transactionSlice.reducer;
