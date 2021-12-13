const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./userSchema');

const TransactionSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

TransactionSchema.virtual('total').get(function(){
  return this.amount * this.price;
});

TransactionSchema.virtual('side').get(function(){
  return this.amount >= 0 ? 'buy' : 'sell';
});

TransactionSchema.pre('save', async function(next) {

  return next()
})


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;