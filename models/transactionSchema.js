const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coin = require('./coinSchema')

/* SACAR ESTO DE AC QUYE ASCOOOOOOOOOOOOOOOOO */
const MAX_LATEST_TRANSACTIONS = 10

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
  const transactions = await Transaction.find(this.getQuery())

  /* Si itero sobre transactions restando coin amount uno a uno corro el riesgo de guardar
  dos veces el mismo documento, y eso genera un error, por eso calculo la cantidad que le tengo que restar
  a cada moneda y edito el amount solo una vez. */
  const totalAmountPerCoin = {}
  transactions.forEach(t => {
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

const removeFromCoinLatestTransactions = async function() {
  const transactions = await Transaction.find(this.getQuery())
  const transactionIds = transactions.map(t => t.id)
  const coinIds = transactions.map(t => t.coin)

  await Coin.updateMany({
    _id: coinIds
  },
  {
    $set: {latestTransactions: []}
  })
}

TransactionSchema.pre('deleteMany', removeFromCoinLatestTransactions)

const addNewLatestTransactions = async function() {
  const transactions = await Transaction.find(this.getQuery())
  const transactionIds = transactions.map(t => t.id)
  let coinIds = transactions.map(t => t.coin)

  /* Elimino IDs repetidas */
  coinIds = [...new Set(coinIds.map(c => String(c)))]

  coinIds.forEach(async (coinId) => {
    let recentTransactions = await Transaction
      .find({coin: coinId, _id : {$nin: transactionIds}}, null, {sort: {date: - 1}, limit: MAX_LATEST_TRANSACTIONS, select: '_id'})

    recentTransactions = recentTransactions.map(t => t._id)
    console.log(recentTransactions)
    await Coin.updateOne({
      _id: coinId
    },
    {
      $push: {latestTransactions: {$each: recentTransactions}}
    })
  })
}

TransactionSchema.pre('deleteMany', addNewLatestTransactions)


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;