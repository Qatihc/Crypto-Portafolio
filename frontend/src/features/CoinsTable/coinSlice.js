import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import api from "../../app/rtkQueryApi";

const coinApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCoins: build.query({
      query: () => ({
          url: 'portfolio/coins',
          method: 'GET',
      }),
      providesTags: () => [{ type: 'Coins'}] 
    })
  })
})

export const { useGetCoinsQuery } = coinApi

/* const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    ids: [],
    entities: {},
    status: STATUS.IDLE
  },
  extraReducers(builder) {
    fetchCoinsReducer(builder)
  }
}) */

/* const fetchCoins = createAsyncThunk('coin/fetchCoins', async () => {
  const data = await coinApi.fetchCoins();
  return data;
})

export { fetchCoins }; */
/* export default coinSlice.reducer; */