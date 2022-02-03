const {fetchSupportedCoinsList, fetchCoinPrices}  = require('./CoinGeckoApiRequests')
const schedule = require('node-schedule');
const CoinMarketData = require('../models/coinMarketDataSchema');

const initializeCoinGeckoFetchJobs = () => {

  const updateSupportedCoins = async () => {
    try {
      const supportedCoins = await fetchSupportedCoinsList();
      const coinsToInsert = supportedCoins.map((coin) => ({ coinGeckoId: coin.id, name: coin.name, symbol: coin.symbol }));
      /* Inserto todos los elementos. Como coinGeckoId es un indice unico no insertara duplicados. */
      await CoinMarketData.insertMany(coinsToInsert, { ordered: false });
    } catch (err) {
      const DUPLICATED_KEY_CODE = 11000
      if (err.code === DUPLICATED_KEY_CODE) return;
      console.log(err);
    }
  }

  const updateCoinMarketData = async () => {
    try {
      const supportedCoins = await CoinMarketData.find({}, 'coinGeckoId', { lean: true });
      const supportedCoinsIds = supportedCoins.map((coin) => coin.coinGeckoId);
      const coinsMarketData = await fetchCoinPrices(supportedCoinsIds)

      await CoinMarketData.bulkWrite(supportedCoins.map(coin => {
        const { coinGeckoId } = coin;
        const coinData = coinsMarketData[coinGeckoId];
        const update = {
          price: coinData.usd,
          marketCap: coinData.usd_market_cap,
          dailyChange: coinData.usd_24h_change
        }
        return { 
          updateOne: {
            filter: { coinGeckoId },
            update,
            upsert: true,
          }
        }
      }))
    } catch (err) {
      console.log(err)
    }
  };

  (async () => {
    await updateSupportedCoins();
    await updateCoinMarketData();
    const jobUpdateSupportedCoins = schedule.scheduleJob('* * */1 * *', updateSupportedCoins);
    const jobUpdateCoinPrices = schedule.scheduleJob('* * */5 * * *', updateCoinMarketData);
  })()
}

module.exports = initializeCoinGeckoFetchJobs
