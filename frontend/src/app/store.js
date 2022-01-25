import { configureStore } from '@reduxjs/toolkit';
import coinSlice from '../features/CoinsTable/coinSlice';
import userSlice, { persistUserMiddleware } from './user/userSlice';
import api from './rtkQueryApi'

const store = configureStore({
  reducer: {
    user: userSlice,
    coin: coinSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistUserMiddleware).concat(api.middleware)
})


export default store;