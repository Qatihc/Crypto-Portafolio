const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserCoin = require('./userCoinSchema')
const ObjectId = require('mongoose').Types.ObjectId;

const TransactionSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: String,
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coin: {
    type: Schema.ObjectId,
    ref: 'UserCoin'
  },
  portfolio: {
    type: Schema.ObjectId,
    ref: 'Portfolio'
  }
});

TransactionSchema.virtual('total').get(function(){
  return this.amount * this.price;
});

TransactionSchema.virtual('side').get(function(){
  return this.amount >= 0 ? 'buy' : 'sell';
});

const updateCoinAmount = async function(next) {
  if (this._update.amount) {
    const transactionToUpdate = await Transaction.findOne(this.getQuery());
    const newAmount = this._update.amount;
    const oldAmount = transactionToUpdate.amount;
    await UserCoin.updateOne(
      {
        _id: transactionToUpdate.coin
      },
      {
        $inc: {amount: - (oldAmount - newAmount)}
      })
  }
}

TransactionSchema.pre('findOneAndUpdate', updateCoinAmount);

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;