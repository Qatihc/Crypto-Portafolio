import { createSlice, createAsyncThunk, createSelector, current } from "@reduxjs/toolkit";
import { STATUS } from "~/src/app/constants";
import transactionApi from "./transactionApi";

const selectTransactionStatus = (state) =>
  state.transaction.status

const selectPageSize = (state) =>
  state.transaction.pagination.pageSize

const selectCurrentPageNumber = (state) =>
  state.transaction.pagination.currentPage

const selectPageCount = (state) => {
  const { pageSize } = state.transaction.pagination;
  const { totalEntities } = state.transaction;
  return Math.ceil(totalEntities / pageSize)
}

const selectPageStatus = (pageNumber) => (state) => {
  const { pages } = state.transaction.pagination;
  if (!pages[pageNumber]) return;

  return pages[pageNumber].status;
}

const selectCurrentPageStatus = (state) =>
  selectPageStatus(selectCurrentPageNumber(state))(state)

const selectPageTransactions = (pageNumber) => (state) => {
  const { pages } = state.transaction.pagination;
  const { entities } = state.transaction
  if (!pages[pageNumber]) return [];

  const { ids } = pages[pageNumber];
  return ids.map((id) => entities[id]);
}

const selectCurrentPageTransactions = (state) => 
  selectPageTransactions(selectCurrentPageNumber(state))(state)


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
  const state = thunkAPI.getState();
  let transactions = [];
  if (selectPageStatus(page)(state) === STATUS.SUCCESS) {
    transactions = selectPageTransactions(page)(state)
  }
  else {
    const pageSize = selectPageSize(state);
    const offset = (page - 1) * pageSize;
    const data = await transactionApi.fetchTransactions({ offset });
    transactions = data.transactions;
  };

  return { transactions, page };
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
      state.pagination.pages[page].ids = [];

      transactions.forEach((transaction) => {
        const id = transaction._id;
        if (!state.entities[id]) {
          state.ids.push(id);
          state.entities[id] = transaction;
        }

        state.pagination.pages[page].ids.push(id);
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
      const pageCount = Math.ceil(state.totalEntities / state.pagination.pageSize);
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
        state.pagination.pages[pageNumber] = {
          status: STATUS.IDLE,
          ids: [],
        }
      }
    })
    .addCase(initializePages.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    })

export const transactionSelectors = { 
  selectTransactionStatus, 
  selectCurrentPageStatus, 
  selectCurrentPageTransactions,
  selectPageCount,
  selectCurrentPageNumber
};

export { initializePages, goToPage };
export default transactionSlice.reducer;