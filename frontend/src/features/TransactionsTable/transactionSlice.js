import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import transactionApi from "./transactionApi";

const selectTransactionStatus = createSelector(
  (state) => state.transaction.status,
  (status) => status
)

/* const selectCurrentPageTransactions = createSelector(
  (state) => state.transaction.page,
  (state) => state.transaction.entities,
  (state) => state.transaction.ids,
  (page, entities, ids) => {
    const { currentPage, pageSize } = page;
    const startIndex = currentPage * pageSize;
    const endIndex = (currentPage + 1) * pageSize;
    const idsToSelect = ids.slice(startIndex, endIndex);
    return idsToSelect.map((id) => entities[id]);
  }
) */

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    ids: [],
    entities: {},
    totalEntities: 0,
    pagination: {
      currentPage: 1,
      pageSize: 20,
      pages: {},
    },
    status: STATUS.IDLE
  },
  reducers: {
  },
  extraReducers(builder) {
    fetchTransactionsReducer(builder)
  }
})

const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async ({ symbol = null, offset = 0}, thunkAPI) => {
/*   const coin = selectCoinById(thunkAPI.getState(), id); */
  const data = await transactionApi.fetchTransactions({ /* symbol: null, offset */});
  return data;
})

const fetchTransactionsReducer = (builder) =>
  builder
    .addCase(fetchTransactions.pending, (state, action) => {
      state.status = STATUS.LOADING;
    })
    .addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      const { transactions, totalTransactions } = action.payload;
      state.totalEntities = totalTransactions;
      transactions.forEach((transaction) => {
        const id = transaction._id;
        state.ids.push(id);
        state.entities[id] = transaction;
      });
      /* Sabiendo la cantidad total de transacciones, inicializo todas las paginas. */
      const lastPage = Math.ceil(state.totalEntities / state.pagination.pageSize);
      for (let pageNumber = 1; pageNumber <= lastPage; pageNumber++) {
        state.pagination.pages[pageNumber] = {
          status: 'idle',
          ids: [],
        }
      }
    })
    .addCase(fetchTransactions.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    })

const goToPage = createAsyncThunk('transaction/goToPage', async ({}, thunkAPI) => {
})

export { selectTransactionStatus, /* selectCurrentPageTransactions */ };
export { fetchTransactions };
export default transactionSlice.reducer;