import api from "~/src/common/rtkQueryApi";

const coinApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCoins: build.query({
      query: () => ({
          url: 'portfolio/coins',
          method: 'GET',
      }),
      providesTags: () => [{ type: 'coins' }] 
    })
  })
})

export const { useGetCoinsQuery } = coinApi