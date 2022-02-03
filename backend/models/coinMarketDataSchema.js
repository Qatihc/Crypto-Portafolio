const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinMarketDataSchema = new Schema({
  symbol: { type: String, uppercase: true },
  coinGeckoId: { type: String, required: true, index: { unique: true } },
  name: String,
  marketCap: Number,
  dailyChange: Number,
  price: Number
})

const CoinMarketData = mongoose.model('CoinMarketData', CoinMarketDataSchema);
module.exports = CoinMarketData;