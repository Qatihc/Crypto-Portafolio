import axios from '~/src/app/axiosClient';

const fetchTransactions = async ({ symbol, offset }) => {

  try {
    const { data } = await axios.get('/portfolio/transaction', { params: { symbol, offset } });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  fetchTransactions
}