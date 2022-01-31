const {fetchSupportedCoinsList, fetchCoinPrices}  = require('./CoinGeckoApiRequests')
const schedule = require('node-schedule');


const initializeCoinGeckoFetchJobs = () => {
  let coinMarketData = {};
  let supportedCoins = {};
  let symbolToCoinGeckoId = {};

  const updateSupportedCoins = async () => {
    try {
      supportedCoins = await fetchSupportedCoinsList();
      /* Creo esta estructura para poder encontra la id en O(1) */
      for (coin of supportedCoins) {
        symbolToCoinGeckoId[coin.symbol.toUpperCase()] = coin.id
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getCoinMarketDataFromSymbol = (symbol) => {
    const cgId = symbolToCoinGeckoId[symbol.toUpperCase()]
    const marketData = coinMarketData[cgId];
    const { 
      usd: price,
      usd_market_cap: marketCap,
      usd_24h_change: dailyChange 
    } = marketData

    return { price, marketCap, dailyChange };
  }

  const getSupportedCoins = () => {
    return supportedCoins;
  }

  const isSupportedCoin = (symbol) => {
    /* Si no tiene id no esta soportada */
    return !!symbolToCoinGeckoId[symbol.toUpperCase()];
  }

  const updateCoinMarketData = async () => {
    // Por el momento no es necesario limitar las monedas a las que les busco el precio, pero podria llegar a serlo.
    try {
      const supportedCoinIds = supportedCoins.map(c => c.id);
      coinMarketData = await fetchCoinPrices(supportedCoinIds);
    } catch (err) {
      console.log(err)
    }
  };

  (async () => {
    await updateSupportedCoins();
    console.log(supportedCoins)
    await updateCoinMarketData();
  })()

  // const jobUpdateSupportedCoins = schedule.scheduleJob('* * */1 * *', updateSupportedCoins);
  // const jobUpdateCoinPrices = schedule.scheduleJob('* * */5 * * *', updateCoinPrices);

  return { getCoinMarketDataFromSymbol, isSupportedCoin, getSupportedCoins }
}

module.exports = initializeCoinGeckoFetchJobs
