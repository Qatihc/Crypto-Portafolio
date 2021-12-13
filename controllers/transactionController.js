const Transaction = require('../models/transactionSchema');
const Coin = require('../models/coinSchema')
const Portfolio = require('../models/portfolioSchema')

const addTransaction = async (req, res) => {
  const {date, symbol, amount, price} = req.body
  /* TODO: VALIDAR ARGUMENTOS, URGENTE! */
  const {id} = res.locals.user
  portfolio = await Portfolio.findOne({user: id})
  if (!portfolio) return next('El usuario no tiene un portfolio creado.')

  if (portfolio.coins.every(e => e.symbol != symbol)) {
    portfolio.coins.push(await new Coin({symbol, amount: 0}))
    await portfolio.save()
  }

  coin = portfolio.coins.find(c => c.symbol == symbol)
  Transaction.create({
    date: date || Date.now(),
    amount,
    coin: coin.id,
    price,
  });

/*   await transaction.save() */

/*   if (coin.latestTransactions.length >= MAX_LATEST_TRANSACTIONS_SAVED) coin.latestTransactions.pop()
  coin.latestTransactions.unshift(transaction)
  await portfolio.save() */

  res.status(200).send()
}

const updateTransaction = (req, res) => {
  res.send('updateTransaction')
}

const removeTransactions = (req, res) => {
  const {transactionsId} = req.body;
  const {user} = req.locals;

  if (!transactionId) {

  }

  Transaction.deleteOne({_id: transactionId});
}

module.exports = {addTransaction, updateTransaction, removeTransactions};
