const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCoinSchema = new Schema({
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

const UserCoin = mongoose.model('UserCoin', UserCoinSchema);
module.exports = UserCoin;