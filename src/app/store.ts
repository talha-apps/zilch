import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transaction/state/transactionSlice';
import controlReducer from '../features/controls/state/controlSlice';
import { transactionApi } from '../features/transaction/services/transactionApi';


export const store = configureStore({
  reducer: {
    transactions: transactionReducer,  // Local Redux slice
    controls: controlReducer,  // Local Redux slice
    [transactionApi.reducerPath]: transactionApi.reducer, // RTK Query API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionApi.middleware), // Add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;