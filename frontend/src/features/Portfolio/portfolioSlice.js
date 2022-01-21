import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import { portfolioApi } from "./portfolioApi";

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
          state.coins.entities[coin._id] = coin;
        })
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
  }
})

const fetchPortfolio = createAsyncThunk('portfolio/fetchPortfolio', async () => {
  const data = await portfolioApi.fetchPortfolio();
  return data;
})

const selectAllCoins = createSelector(
  (state) => state.portfolio.coins.entities,
  (entities) => {
    const ids = Object.keys(entities);
    return ids.map(id => entities[id]);;
  }
)

const selectPortfolioStatus = createSelector(
  (state) => state.portfolio.status,
  (status) => status
)

export { selectAllCoins, selectPortfolioStatus };
export { fetchPortfolio };
export default portfolioSlice.reducer;