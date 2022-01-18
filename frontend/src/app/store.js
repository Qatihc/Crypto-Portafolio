import { configureStore } from '@reduxjs/toolkit';
import userSlice, { persistUserMiddleware } from './user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistUserMiddleware)
})


export default store;