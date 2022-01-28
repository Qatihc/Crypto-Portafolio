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
      invalidatesTags: [{ type: 'Transactions' }],
    })
  })
})

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    editRows: {},
    hoverRows: {},
  },
  reducers: {
    addEditRow: (state, action) => {
      const rowId = action.payload;
      state.editRows[rowId] = true;
    },
    removeEditRow: (state, action) => {
      const rowId = action.payload;
      state.editRows[rowId] = undefined;
    }
  }
})

const transactionSliceReducer = transactionSlice.reducer;

export const isRowEdit = (rowId) => (state) => {
  return state.transaction.editRows[rowId];
}

export const { useGetTransactionsCountQuery, useGetTransactionsQuery, useCreateTransactionMutation } = transactionApi

export const { addEditRow, removeEditRow } = transactionSlice.actions
export { transactionSliceReducer };
