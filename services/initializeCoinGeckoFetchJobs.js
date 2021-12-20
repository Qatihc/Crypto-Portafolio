const {fetchSupportedCoinsList, fetchCoinPrices}  = require('./CoinGeckoApiRequests')
const schedule = require('node-schedule');


const initializeCoinGeckoFetchJobs = async (app) => {

  const updateSupportedCoins = async () => {
    try {
      const supportedCoins = await fetchSupportedCoinsList();
      console.log(supportedCoins)
      /* Creo esta estructura para poder encontra la id en O(1) */
      const symbolToCoinGeckoId = {}
      for (coin of supportedCoins) {
        symbolToCoinGeckoId[coin.symbol.toUpperCase()] = coin.id
      }
      app.locals = {...app.locals, symbolToCoinGeckoId, supportedCoins};
    } catch (err) {
      console.log(err)
    }
  }

  const updateCoinPrices = async () => {
    // Por el momento no es necesario limitar las monedas a las que les busco el precio, pero podria llegar a serlo.
    // const activeCoins = await Coin.distinct('symbol');
    // const activeCoinsIds = activeCoins.map(c => app.locals.symbolToCoinGeckoId[c.toUpperCase()])
    try {
      const supportedCoinIds = app.locals.supportedCoins.map(c => c.id)
      const coinPrices = await fetchCoinPrices(supportedCoinIds);
      app.locals.coinPrices = coinPrices;
    } catch (err) {
      console.log(err)
    }
  };

  await updateSupportedCoins()
  // const jobUpdateSupportedCoins = schedule.scheduleJob('* * */1 * *', updateSupportedCoins);
  
  await updateCoinPrices();
  // const jobUpdateCoinPrices = schedule.scheduleJob('* * */5 * * *', updateCoinPrices);
}

module.exports = initializeCoinGeckoFetchJobs