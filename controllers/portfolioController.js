const Portfolio = require('../models/portfolioSchema');
const Coin = require('../models/coinSchema');
const Transaction = require('../models/transactionSchema')

const inputErrorMessages = require('../inputValidators/inputErrorMessages');
const RequestError = require('../errorTypes/RequestError')

const {MAX_LATEST_TRANSACTIONS} = require('../constants')


const retrieveUserPortfolio = (req, res) => {
  res.send(res.locals.user.username);
}

const retrievePortfolioReturns = (req, res) => {
  res.send(res.locals.user.username);
}

const createTransaction = async (req, res, next) => {
  const { amount, price } = req.body;
  let { date, symbol } = req.body;
  const { portfolio } = res.locals.user;

  symbol = symbol.toUpperCase();
  if (req.app.locals.symbolToCoinGeckoId[symbol] === undefined) return res.send('invalid coin');

  const coinWithSameSymbolAsTransaction = await Coin.findOne({portfolio, symbol});
  if (!coinWithSameSymbolAsTransaction) {
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

/*   await Coin.updateOne(
    { _id: transaction.coin },
    {
      $push: {
        latestTransactions: {
          $each: transaction.id,
          $sort: {date: -1},
          $slice: MAX_LATEST_TRANSACTIONS
        }
    }) */

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

const updateTransaction = async (req, res, next) => {
  const {transactionId} = req.body;
  const updatableFields = ['amount', 'price'];

  const update = {};
  for (field in req.body) {
    if (field && updatableFields.includes(field)) {
      update[field] = req.body[field];
    }
  }

  await Transaction.findOneAndUpdate({_id: transactionId}, update, {useFindAndModify: false});
  res.send('ready go');
}

const retrievePortfolioCoinsPrice = async (req, res, next) => {
  try {
    const {portfolio} = res.locals.user;
    const coins = await Coin.find({portfolio, amount: {$ne: 0}}, 'amount symbol');

    const coinsUsdPrice = {};
    for (coin of coins) {
      const cgId = req.app.locals.symbolToCoinGeckoId[coin.symbol];
      const usdPrice = req.app.locals.coinPrices[cgId].usd;
      coinsUsdPrice[coin.symbol] = usdPrice;
    }

    res.send(coinsUsdPrice)
  } catch (err) {
    console.log(err)
    next(err);
  }
}

module.exports = {
  retrieveUserPortfolio,
  retrievePortfolioReturns,
  createTransaction,
  deleteManyTransaction,
  updateTransaction,
  retrievePortfolioCoinsPrice
};