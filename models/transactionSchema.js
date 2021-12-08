const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./userSchema');

const TransactionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    lowercase: true,
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

TransactionSchema.pre('deleteOne', async function(next) {
  const transactionId = this.getFilter()['_id'];
  console.log(transactionId);
})

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;