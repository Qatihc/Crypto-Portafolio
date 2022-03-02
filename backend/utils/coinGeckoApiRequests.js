const axios = require('axios').default;
const axiosRetry = require('axios-retry');


const fetchSupportedCoinsList = async (app) => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryDelay: retryCount => {
        console.log('retray numero ', retryCount)
        return retryCount * 5000
      }
    });

    const response = await axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/coins/list',
    });

    return response.data;
  } catch(err) {
    console.log('Error en fetchCoinDataFromCoingecko ', err)
    throw new Error(err);
  }
}

const fetchCoinPrices = async (coinGeckoIds) => {
  if (!coinGeckoIds) return;
  try {
    axiosRetry(axios, {
      retries: 5,
      retryDelay: retryCount => {
        console.log('Retry:  ', retryCount)
        return retryCount * 5000
      }
    });
  /* La longitud maxima que puede tener una URL para que sea valida es aprox 6000 bytes */
    const baseUrl = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=';
    const MAX_PARAMS_LENGTH = 5500 - baseUrl.length;

    const params = []

    params.push('');
    for (const coin of coinGeckoIds) {
      if (params.at(-1).length + coin.length >= MAX_PARAMS_LENGTH) params.push('')
      params[params.length - 1] += coin + ',';
    }
  
    const requests = []
    for (const ids of params) {
      const request = axios.get('https://api.coingecko.com/api/v3/simple/price',
        {params: {
          ids,
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true
        }}
      )
      requests.push(request)
    }

    let responses = await Promise.all(requests);
    responses = responses.map(r => r.data);

    const reducer = (prev, current) => Object.assign(prev, current)
    return responses.reduce(reducer, {})
  } catch(err) {
    console.log('Error en fetchCoinPrices ', err);
    throw new Error(err);
  }
}



module.exports = { fetchSupportedCoinsList, fetchCoinPrices }
