import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import coinApi from "./coinApi";

const selectAllCoins = createSelector(
  (state) => state.coin.entities,
  (entities) => {
    const ids = Object.keys(entities);
    return ids.map(id => entities[id]);;
  }
)

const selectCoinById = (id) => createSelector(
  (state) => state.coin.entities,
  (state, id) => id,
  (entities, id) => entities[id]
)

const selectCoinStatus = createSelector(
  (state) => state.coin.status,
  (status) => status
)

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    ids: [],
    entities: {},
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
    fetchCoinsReducer(builder)
  }
})

const fetchCoins = createAsyncThunk('coin/fetchCoins', async () => {
  const data = await coinApi.fetchCoins();
  return data;
})

const fetchCoinsReducer = (builder) =>
  builder
    .addCase(fetchCoins.pending, (state, action) => {
      state.status = STATUS.LOADING;
    })
    .addCase(fetchCoins.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      action.payload.forEach(coin => {
        state.ids.push(coin._id);
        state.entities[coin._id] = coin;
      })
    })
    .addCase(fetchCoins.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    })

export { selectAllCoins, selectCoinStatus, selectCoinById };
export { fetchCoins };
export default coinSlice.reducer;