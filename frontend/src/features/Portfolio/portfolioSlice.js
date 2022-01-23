import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import portfolioApi from "./portfolioApi";

const selectAllCoins = createSelector(
  (state) => state.portfolio.coins.entities,
  (entities) => {
    const ids = Object.keys(entities);
    return ids.map(id => entities[id]);;
  }
)

const selectCoinById = (id) => createSelector(
  (state) => state.portfolio.coins.entities,
  (state, id) => id,
  (entities, id) => entities[id]
)

const selectPortfolioStatus = createSelector(
  (state) => state.portfolio.status,
  (status) => status
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    coins: {
      ids: [],
      entities: {}
    },
    transactions: {
      ids: [],
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
        state.status = STATUS.LOADING;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        action.payload.forEach(coin => {
          state.coins.ids.push(coin._id);
          state.coins.entities[coin._id] = {
            ...coin,
            transactions: []
          };
        })
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(fetchCoinTransactions.pending, (state, action) => {
        /* Add loading */
      })
      .addCase(fetchCoinTransactions.fulfilled, (state, action) => {
        const { id, transactions } = action.payload;
        const transactionIds = transactions.map((transaction) => transaction._id);
        state.coins.entities[id].transactions.push(...transactionIds);
      })
      .addCase(fetchCoinTransactions.rejected, (state, action) => {
      })
  }
})

const fetchPortfolio = createAsyncThunk('portfolio/fetchPortfolio', async () => {
  const data = await portfolioApi.fetchPortfolio();
  return data;
})

const fetchCoinTransactions = createAsyncThunk('portfolio/fetchCoinTransactions', async ({ id, offset }, thunkAPI) => {
  const coin = selectCoinById(thunkAPI.getState(), id);
  const data = await portfolioApi.fetchTransactions(coin.symbol, offset);
  return { transactions: data, id};
})

export { selectAllCoins, selectPortfolioStatus, selectCoinById };
export { fetchPortfolio, fetchCoinTransactions };
export default portfolioSlice.reducer;