import api from "~/src/app/rtkQueryApi";

const portfolioApi = api.injectEndpoints({
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
        return ({url: 'portfolio/transaction', method: 'GET', params: { offset, limit: pageSize }})
      }
    })
  })
})

export const { useGetTransactionsCountQuery, useGetTransactionsQuery } = portfolioApi