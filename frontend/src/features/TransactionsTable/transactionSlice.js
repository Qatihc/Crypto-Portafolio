import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import transactionApi from "./transactionApi";

const selectTransactionStatus = createSelector(
  (state) => state.transaction.status,
  (status) => status
)
const selectPageSize = createSelector(
  (state) => state.transaction.pagination.pageSize,
  (pageSize) => pageSize
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
    initializePagesReducer(builder)
    goToPageReducer(builder)
  }
})

const goToPage = createAsyncThunk('transaction/goToPage', async (page, thunkAPI) => {
  /* If (paginaExiste) noHagoFetch */
  const pageSize = selectPageSize(thunkAPI.getState());
  const offset = (page - 1) * pageSize;
  const data = await transactionApi.fetchTransactions({ offset });
  return { ...data, page };
})

const goToPageReducer = (builder) =>
  builder
    .addCase(goToPage.pending, (state, action) => {
      state.status = STATUS.LOADING;
    })
    .addCase(goToPage.fulfilled, (state, action) => {
      const { transactions, page } = action.payload;
      state.status = STATUS.SUCCESS;
      state.pagination.currentPage = page;
      transactions.forEach((transaction) => {
        const id = transaction._id;
        state.ids.push(id);
        state.pagination.pages[page].ids.push(id);
        state.entities[id] = transaction;
      });
      state.pagination.pages[page].status = STATUS.SUCCESS;
    })
    .addCase(goToPage.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    })

const initializePages = createAsyncThunk('transaction/initializePages', async (_, thunkAPI) => {
  const data = await transactionApi.fetchTotalTransactions();
  return data;
})

const initializePagesReducer = (builder) => 
  builder
    .addCase(initializePages.pending, (state, action) => {
      state.status = STATUS.LOADING;
    })
    .addCase(initializePages.fulfilled, (state, action) => {
      const { totalTransactions } = action.payload;
      state.totalEntities = totalTransactions;
      const lastPage = Math.ceil(state.totalEntities / state.pagination.pageSize);
      for (let pageNumber = 1; pageNumber <= lastPage; pageNumber++) {
        state.pagination.pages[pageNumber] = {
          status: STATUS.IDLE,
          ids: [],
        }
      }
    })
    .addCase(initializePages.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    })

export { selectTransactionStatus, /* selectCurrentPageTransactions */ };
export { initializePages, goToPage };
export default transactionSlice.reducer;