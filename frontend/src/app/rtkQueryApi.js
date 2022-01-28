import axios from './axiosClient'
import { createApi } from "@reduxjs/toolkit/query/react"

const axiosBaseQuery = ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url, method, data: data, params });
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }

const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: '/'
  }),
  endpoints: () => ({})
})

export default api;