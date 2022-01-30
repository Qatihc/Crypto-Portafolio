import { configureStore } from '@reduxjs/toolkit';
import { transactionSliceReducer } from '../features/TransactionsTable/transactionSlice';
import userSlice, { persistUserMiddleware } from './user/userSlice';
import api from './rtkQueryApi'

const store = configureStore({
  reducer: {
    user: userSlice,
    transaction: transactionSliceReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistUserMiddleware).concat(api.middleware)
})


export default store;