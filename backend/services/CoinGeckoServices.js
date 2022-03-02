const { fetchSupportedCoinsList, fetchCoinPrices }  = require('../utils/coinGeckoApiRequests');
const CoinMarketData = require('../models/coinMarketDataSchema');

const updateSupportedCoins = async () => {
  try {
    const supportedCoins = await fetchSupportedCoinsList();
    const coinsToInsert = supportedCoins.map((coin) => ({ coinGeckoId: coin.id, name: coin.name, symbol: coin.symbol }));
    await CoinMarketData.insertMany(coinsToInsert, { ordered: false });
  } catch (err) {
    const DUPLICATED_KEY_CODE = 11000
    if (err.code === DUPLICATED_KEY_CODE) return;
  }
}

const updateCoinMarketData = async () => {
  try {
    const supportedCoins = await CoinMarketData.find({}, 'coinGeckoId', { lean: true });
    const supportedCoinsIds = supportedCoins.map((coin) => coin.coinGeckoId);
    const coinsMarketData = await fetchCoinPrices(supportedCoinsIds);
    await CoinMarketData.bulkWrite(supportedCoins.map(coin => {
      const { coinGeckoId } = coin;
      const coinData = coinsMarketData[coinGeckoId];
      const update = 
        (coinData) ? 
        {
          price: coinData.usd,
          marketCap: coinData.usd_market_cap,
          dailyChange: coinData.usd_24h_change
        } :
        {}

      return { 
        updateOne: {
          filter: { coinGeckoId },
          update,
          upsert: true,
        }
      }
    }))
  } catch (err) {
    return;
  }
};

module.exports = { 
  updateSupportedCoins,
  updateCoinMarketData 
};
