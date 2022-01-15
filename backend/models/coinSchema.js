const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  portfolio: {
    type: Schema.ObjectId,
    ref: 'Portfolio'
  },
  symbol: String,
  amount: {
    type: Number,
    default: 0,
  },
  latestTransactions: [{
    type: Schema.ObjectId,
    ref: 'Transaction'
  }]
})

const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;