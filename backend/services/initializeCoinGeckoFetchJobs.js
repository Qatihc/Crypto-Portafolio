const {fetchSupportedCoinsList, fetchCoinPrices}  = require('./CoinGeckoApiRequests')
const schedule = require('node-schedule');


const initializeCoinGeckoFetchJobs = () => {
  let coinPrices = {};
  let supportedCoins = {};
  let symbolToCoinGeckoId = {};

  const updateSupportedCoins = async () => {
    try {
      supportedCoins = await fetchSupportedCoinsList();
      /* Creo esta estructura para poder encontra la id en O(1) */
      for (coin of supportedCoins) {
        symbolToCoinGeckoId[coin.symbol.toUpperCase()] = coin.id
      }
      console.log(supportedCoins.length);
    } catch (err) {
      console.log(err)
    }
  }

  const getCoinPriceFromSymbol = (symbol) => {
    const cgId = symbolToCoinGeckoId[symbol.toUpperCase()]
    const price = coinPrices[cgId];
    if (!price) return null;
    return coinPrices[cgId].usd;
  }

  const isSupportedCoin = (symbol) => {
    /* Si no tiene id no esta soportada */
    return !!symbolToCoinGeckoId[symbol.toUpperCase()];
  }

  const updateCoinPrices = async () => {
    // Por el momento no es necesario limitar las monedas a las que les busco el precio, pero podria llegar a serlo.
    try {
      const supportedCoinIds = supportedCoins.map(c => c.id);
      coinPrices = await fetchCoinPrices(supportedCoinIds);
    } catch (err) {
      console.log(err)
    }
  };

  (async () => {
    await updateSupportedCoins();
    await updateCoinPrices();
  })()

  // const jobUpdateSupportedCoins = schedule.scheduleJob('* * */1 * *', updateSupportedCoins);
  // const jobUpdateCoinPrices = schedule.scheduleJob('* * */5 * * *', updateCoinPrices);

  return { getCoinPriceFromSymbol, isSupportedCoin }
}

module.exports = initializeCoinGeckoFetchJobs
