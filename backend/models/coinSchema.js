const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  portfolio: {
    type: Schema.ObjectId,
    ref: 'Portfolio'
  },
  name: String,
  symbol: String,
  amount: {
    type: Number,
    default: 0,
  },
  coinMarketData: {
    type: Schema.ObjectId,
    ref: 'CoinMarketData'
  }
})

const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;