import axios from '~/src/app/axiosClient';


/* La respuesta es un array de monedas. Cada moneda contiene informacion sobre la propia moneda, 
y un array de las ultimas transacciones realizadas con ella.  */
const fetchPortfolio = async () => {
  try {
    const { data } = await axios.get('/portfolio');
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

const fetchTransactions = async (symbol, offset) => {
  try {
    const { data } = await axios.get('/portfolio/transaction', { params: { symbol, offset } });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  fetchPortfolio,
  fetchTransactions
}