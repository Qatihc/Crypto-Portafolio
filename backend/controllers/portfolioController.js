const UserCoin = require('../models/userCoinSchema');
const Transaction = require('../models/transactionSchema')
const CoinMarketData = require('../models/coinMarketDataSchema');
const PortfolioServices = require('../services/PortfolioServices');


const retrieveUserCoinsCount = async (req, res, next) => {
  const { portfolio } = res.locals.user;
  try {
    const count = await PortfolioServices.getCoinCount({ portfolio });
    return res.send({ count });
  } catch (err) {
    return next(err);
  }
}

const retrieveUserCoins = async (req, res) => {
  const { offset = 0, limit = 20} = req.query;
  const { portfolio } = res.locals.user;
  const coins = await PortfolioServices.getCoins({ portfolio, offset, limit });
  res.send(coins);
}

const retrieveTransactionsCount = async (req, res, next) => {
  const { portfolio } = res.locals.user;
  try {
    const count = await PortfolioServices.getTransactionCount({ portfolio });
    return res.send({ count });
  } catch (err) {
    return next(err);
  }
}

const retrieveTransactions = async (req, res, next) => {
  const { offset = 0, limit = 20} = req.query;
  if (offset < 0) return res.status(401).send('Invalid offset');
  const { portfolio } = res.locals.user;
  const transactions = await PortfolioServices.getTransactions({ portfolio, offset, limit });
  return res.send(transactions);
}

const retrievePortfolioReturns = (req, res) => {
  res.send('TO BE IMPLEMENTED');
}

const createTransaction = async (req, res, next) => {
  let {
    symbol,
    amount,
    price,
    date,
  } = req.body;
  const { portfolio } = res.locals.user;
  if (!amount) return res.status(400).send('La cantidad debe ser distinta de 0.');

  try {
    await PortfolioServices.createTransaction({ portfolio, symbol, amount, price, date });
    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

const deleteTransactions = async (req, res, next) => {
  let { transactionId } = req.body;
  if (!Array.isArray(transactionId)) transactionId = [transactionId];
  try {
    await PortfolioServices.deleteTransactionsById({ ids: transactionId });
    return res.status(200).send()
  } catch (err) {
    return next(err);
  }
}

const updateTransaction = async (req, res, next) => {
  const { transactionId } = req.body;
  const updatableFields = ['amount', 'price'];

  const update = {};
  for (field in req.body) {
    if (field && updatableFields.includes(field)) {
      update[field] = req.body[field];
    }
  }

  try {
    await PortfolioServices.updateTransactionById({ id: transactionId, update })
    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  retrieveUserCoins,
  retrievePortfolioReturns,
  createTransaction,
  deleteTransactions,
  updateTransaction,
  retrieveTransactions,
  retrieveTransactionsCount,
  retrieveUserCoinsCount
};