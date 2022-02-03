import api from "~/src/common/rtkQueryApi";

const coinApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCoinsCount: build.query({
      query: () => ({
        url: 'portfolio/coin/count',
        method: 'GET'
      }),
      transformResponse: (data) => {
        return data.count;
      },
      providesTags: [{ type: 'coinCount' }]
    }),
    getCoins: build.query({
      query: ({ pageNumber, pageSize }) => {
        const offset = (pageNumber - 1) * pageSize;
        return ({
          url: 'portfolio/coin',
          method: 'GET',
          params: { offset, limit: pageSize }
        })
      },
      providesTags: (result, error, { pageNumber, pageSize }) => [{ type: 'coins', id: `${pageNumber};${pageSize}` }] 
    })
  })
})

export const { useGetCoinsQuery, useGetCoinsCountQuery } = coinApi;