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

export const { useGetTransactionsCountQuery, useGetTransactionsQuery, useCreateTransactionMutation } = transactionApi