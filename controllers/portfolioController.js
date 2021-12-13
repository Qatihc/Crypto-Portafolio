const Portfolio = require('../models/portfolioSchema');
const Coin = require('../models/coinSchema');
const Transaction = require('../models/transactionSchema')

const inputErrorMessages = require('../inputValidators/inputErrorMessages');
const RequestError = require('../errorTypes/RequestError')

/* TODO: MOVER A DONDE TENGA SENTIDO */
const MAX_LATEST_TRANSACTIONS = 10


const retrieveUserPortfolio = (req, res) => {
  res.send(res.locals.user.username);
}

const retrievePortfolioReturns = (req, res) => {
  res.send(res.locals.user.username);
}

const createTransaction = async (req, res, next) => {
  const { symbol, amount, price } = req.body;
  let { date } = req.body;
  const { portfolio } = res.locals.user;

  const coinWithSameSymbol = await Coin.findOne({portfolio, symbol});
  if (!coinWithSameSymbol) {
    await Coin.create({symbol, portfolio});
  }

  const coin = await Coin.findOne({symbol, portfolio});
  date = (date === undefined) ? Date.now() : date;
  transaction = new Transaction({ symbol, amount, price, date, coin: coin.id })

  coin.amount += transaction.amount;

  /* TODO: Chequear si es realmente una de las ultimas transacciones (comparar fechas) */
  if (coin.latestTransactions.length > MAX_LATEST_TRANSACTIONS) coin.latestTransactions.pop()
  coin.latestTransactions.unshift(transaction.id);

  await coin.save();
  await transaction.save();

  return res.send(transaction.id)
}

const deleteManyTransaction = async (req, res, next) => {
  let { transactionIds } = req.body;
  if (!Array.isArray(transactionIds)) transactionIds = [transactionIds];

  try {
    const transactionDelete = await Transaction.deleteMany({_id: {$in: transactionIds}})
    console.log(transactionDelete.deletedCount)
    /* TODO: CHEQUEAR SI REALMENTE BORRO ALGO! */
    return res.send('ok!')
  } catch (err) {
    console.log(err)
    return res.send('ok!')
  }
}

const updateTransactionAmount = async (req, res, next) => {
  res.send('WIP')
}

const updateTransactionPrice = async (req, res, next) => {
  res.send('WIP')
}

module.exports = {retrieveUserPortfolio, retrievePortfolioReturns, createTransaction, deleteManyTransaction};