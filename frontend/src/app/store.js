import { configureStore } from '@reduxjs/toolkit';
import coinSlice from '../features/CoinsTable/coinSlice';
import transactionSlice from '../features/TransactionsTable/transactionSlice';
import userSlice, { persistUserMiddleware } from './user/userSlice';


const store = configureStore({
  reducer: {
    user: userSlice,
    coin: coinSlice,
    transaction: transactionSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistUserMiddleware)
})


export default store;