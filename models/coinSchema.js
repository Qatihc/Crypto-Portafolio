const mongoose = require('mongoose');
const Transaction = require('./transactionSchema')
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  symbol: String,
  amount: {
    type: Number,
    default: 0,
  },
  latestTransactions: [Transaction.schema],
  transactions: [{
    type: Schema.ObjectId,
    ref: 'Transaction'
  }]
})

const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;