const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coin = require('./coinSchema')

const {MAX_LATEST_TRANSACTIONS} = require('../constants')

const TransactionSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
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
    ref: 'Coin'
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


const ObjectId = require('mongoose').Types.ObjectId;

const subtractTransactionAmountFromCoinAmount = async function() {
  /* TODO: encontrar una forma mejor de hacer esto */
  const transactionsToDelete = await Transaction.find(this.getQuery())

  /* Si itero sobre transactions restando coin amount uno a uno corro el riesgo de guardar
  dos veces el mismo documento, y eso genera un error, por eso calculo la cantidad que le tengo que restar
  a cada moneda y edito el amount solo una vez. */
  const totalAmountPerCoin = {}
  transactionsToDelete.forEach(t => {
    if (totalAmountPerCoin[t.symbol] === undefined) totalAmountPerCoin[t.symbol] = {amount: 0, id: t.coin};
    totalAmountPerCoin[t.symbol].amount += t.amount
  })

  for (const symbol in totalAmountPerCoin) {
    const coin = await Coin.findOne({_id: totalAmountPerCoin[symbol].id})
    coin.amount -= totalAmountPerCoin[symbol].amount
    await coin.save()
  }
}

TransactionSchema.pre('deleteMany', subtractTransactionAmountFromCoinAmount)

const updateNewLatestTransactions = async function() {
  const transactionsToDelete = await Transaction.find(this.getQuery());
  const transactionToDeleteIds = transactionsToDelete.map(t => t.id);
  let coinsIds = transactionsToDelete.map(t => t.coin);
  /* Elimino IDs repetidas */
  coinsIds = [...new Set(coinsIds.map(c => String(c)))]

  await Coin.updateMany(
  {
    _id: coinsIds
  },
  {
    $set: {latestTransactions: []}
  });

  const addNewLatestTransactions = async (coinId) => {
    const recentTransactions = await Transaction.find(
    {
      coin: coinId,
      _id : {$nin: transactionToDeleteIds}
    }, 
    null, 
    {
      sort: {date: - 1}, 
      limit: MAX_LATEST_TRANSACTIONS, 
      select: '_id'
    })
    const recentTransactionsIds = recentTransactions.map(t => t._id)

    await Coin.updateOne(
    {
      _id: coinId
    },
    {
      $push: {latestTransactions: {$each: recentTransactionsIds}}
    })
  }

  coinsIds.forEach(addNewLatestTransactions)
}

TransactionSchema.pre('deleteMany', updateNewLatestTransactions)

TransactionSchema.pre('findOneAndUpdate', async function(next) {

  if (this._update.amount) {
    const transactionToUpdate = await Transaction.findOne(this.getQuery());
    const newAmount = this._update.amount;
    const oldAmount = transactionToUpdate.amount;
    await Coin.updateOne(
      {
        _id: transactionToUpdate.coin
      },
      {
        $inc: {amount: - (oldAmount - newAmount)}
      })
  }
})

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;