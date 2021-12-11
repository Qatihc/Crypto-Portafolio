const mongoose = require('mongoose');
const Transaction = require('./transactionSchema')
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  symbol: String,
  amount: Number,
  latestTransactions: [Transaction]
})

const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;