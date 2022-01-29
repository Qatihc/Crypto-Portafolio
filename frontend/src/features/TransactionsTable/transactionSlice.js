import { createSlice } from "@reduxjs/toolkit";
import api from "~/src/app/rtkQueryApi";


const transactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactionsCount: build.query({
      query: () => ({ url: `portfolio/count`}),
      transformResponse: (baseQueryReturnValue) => {
        return baseQueryReturnValue.totalTransactions;
      }
    }),
    getTransactions: build.query({
      query: ({ pageNumber, pageSize }) => {
        const offset = (pageNumber - 1) * pageSize;
        return ({
          url: 'portfolio/transaction',
          method: 'GET',
          params: { offset, limit: pageSize },
        })
      },
      providesTags: (result, error, { pageNumber, pageSize}) => [{ type: 'Transactions', id: `${pageNumber};${pageSize}`}] 
    }),
    createTransaction: build.mutation({
      query: ({ symbol, price, amount, date }) => ({
        url: `portfolio/createTransaction`,
        method: 'POST',
        data: { symbol, price, amount, date },
      }),
      invalidatesTags: [{ type: 'Transactions' }, { type: 'Coins'}],
    }),
    updateTransaction: build.mutation({
      query: ({ id, ...data }) => ({
        url: 'portfolio/updateTransaction',
        method: 'POST',
        data: { transactionId: id, ...data }
      }),
      invalidatesTags: [{ type: 'Transactions' }, { type: 'Coins'}],
    }),
    deleteTransaction: build.mutation({
      query: ({ transactionId }) => ({
        url: 'portfolio/deleteTransaction',
        method: 'POST',
        data: { transactionId }
      }),
      invalidatesTags: [{ type: 'Transactions' }, { type: 'Coins'}],
    })
  })
})

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    editRows: {},
    hoverRows: {},
    deleteRows: {},
  },
  reducers: {
    addEditRow: (state, action) => {
      const rowId = action.payload;
      state.editRows[rowId] = true;
    },
    removeEditRow: (state, action) => {
      const rowId = action.payload;
      state.editRows[rowId] = undefined;
    },
    addDeleteRow: (state, action) => {
      const rowId = action.payload;
      state.deleteRows[rowId] = true;
    },
    removeDeleteRow: (state, action) => {
      const rowId = action.payload;
      state.deleteRows[rowId] = undefined;
    }
  }
})

const transactionSliceReducer = transactionSlice.reducer;

export const isRowEdit = (rowId) => (state) => {
  return state.transaction.editRows[rowId];
}

export const isRowDelete = (rowId) => (state) => {
  return state.transaction.deleteRows[rowId];
}

export const { 
  useGetTransactionsCountQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation 
} = transactionApi

export const { addEditRow, removeEditRow, addDeleteRow, removeDeleteRow } = transactionSlice.actions
export { transactionSliceReducer };
