import axios from '~/src/app/axiosClient';

/* La respuesta es un array de monedas. */
const fetchCoins = async () => {
  try {
    const { data } = await axios.get('/portfolio/coins');
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  fetchCoins
}