import { configureStore } from '@reduxjs/toolkit';
import portfolioSlice from '../features/Portfolio/portfolioSlice';
import userSlice, { persistUserMiddleware } from './user/userSlice';


const store = configureStore({
  reducer: {
    user: userSlice,
    portfolio: portfolioSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistUserMiddleware)
})


export default store;