import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import { portfolioApi } from "./portfolioApi";

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    coins: {
      idsByValue: [],
      entities: {}
    },
    transactions: {
      idsByDate: [],
      entities: {}
    },
    status: STATUS.IDLE
  },
/*   reducers: {
    logout: state => {
      state.currentUser = null;
      state.token = null;
      return state;
    }
  }, */
  extraReducers(builder) {
    builder
      .addCase(fetchPortfolio.pending, (state, action) => {
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        action.payload.forEach(coin => {
          state.coins.idsByValue.push(coin._id);
          coin.latestTransactions = coin.latestTransactions
            .map((transaction) => {
              state.transactions.idsByDate.push(transaction._id);
              state.transactions.entities[transaction._id] = transaction;
              return transaction._id;
            })
          state.coins.entities[coin._id] = coin;

        })
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
      })
  }
})

const fetchPortfolio = createAsyncThunk('portfolio/fetchPortfolio', async () => {
  const data = await portfolioApi.fetchPortfolio();
  return data;
})

export { fetchPortfolio };
export default portfolioSlice.reducer;