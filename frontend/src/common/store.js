import { configureStore } from '@reduxjs/toolkit';
import { transactionSliceReducer } from '../features/TransactionsTable/transactionSlice';
import userSlice, { persistUserMiddleware } from './user/userSlice';

import api from './rtkQueryApi'
import navbarSlice from '../features/Navbar/navbarSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    navbar: navbarSlice,
    transaction: transactionSliceReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistUserMiddleware).concat(api.middleware)
})


export default store;