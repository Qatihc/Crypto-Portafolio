const Portfolio = require('../models/portfolioSchema');
const UserCoin = require('../models/userCoinSchema');
const Transaction = require('../models/transactionSchema')
const CoinMarketData = require('../models/coinMarketDataSchema');
const { COIN_MIN_AMOUNT_TO_DISPLAY } = require('../constants');

const retrieveUserCoinsCount = async (req, res, next) => {
  const { portfolio } = res.locals.user;
  try {
    const count = await UserCoin.countDocuments({ portfolio, amount: { $gt: COIN_MIN_AMOUNT_TO_DISPLAY } });
    return res.send({ count });
  } catch (err) {
    return next(err);
  }
}

const retrieveUserCoins = async (req, res) => {
  const { offset = 0, limit = 20} = req.query;
  const { portfolio } = res.locals.user;

  let coins = await UserCoin
    .find({ portfolio, amount: { $gt: COIN_MIN_AMOUNT_TO_DISPLAY } })
    .skip(Number(offset))
    .limit(Number(limit))
    .populate('coinMarketData', '-_id dailyChange marketCap price coinGeckoId')
    .lean()
  
  coins = coins.map((coin) => ({
    ...coin,
    ...coin.coinMarketData,
    coinMarketData: undefined
  }))

  res.send(coins);
}

const retrieveTransactionsCount = async (req, res, next) => {
  const { portfolio } = res.locals.user;
  try {
    const count = await Transaction.countDocuments({ portfolio });
    return res.send({ count });
  } catch (err) {
    return next(err);
  }
}

const retrieveTransactions = async (req, res, next) => {
  const { offset = 0, limit = 20} = req.query;
  if (offset < 0) return res.status(401).send('Invalid offset');
  const { portfolio } = res.locals.user;

  const transactions = await Transaction
    .find({ portfolio })
    .sort({ date: -1 })
    .skip(Number(offset))
    .limit(Number(limit))
    .lean()

  return res.send(transactions);
}

const retrievePortfolioReturns = (req, res) => {
  /* TO DO */
  res.send(res.locals.user.username);
}

const createTransaction = async (req, res, next) => {
  let {
    symbol,
    amount,
    price,
    date = Date.now() 
  } = req.body;
  if (!amount) return res.status(400).send('La cantidad debe ser distinta de 0.');

  amount = parseFloat(amount);
  symbol = symbol.toUpperCase();
  const { portfolio } = res.locals.user;

  // Hay monedas que copian el simbolo de otras, para intentar evitar elegir alguna de estas
  // si existen varias con el mismo simbolo elijo la que mas market cap tenga. 

  const coinMarketData = await CoinMarketData.findOne({ symbol }, null, { sort: { marketCap: -1 } });
  if (!coinMarketData) return res.status(400).send('Simbolo invalido o moneda no soportada.');
  const name = coinMarketData.name;

  try {
    let coinWithSameSymbol = await UserCoin.findOne({ portfolio, symbol });
    if (!coinWithSameSymbol) {
      coinWithSameSymbol = await UserCoin.create({ 
        portfolio,
        symbol,
        name,
        coinMarketData: coinMarketData.id 
      });
    }

    const transaction = new Transaction({ 
      symbol,
      name,
      amount,
      price,
      date,
      coin: coinWithSameSymbol.id,
      portfolio 
    });

    coinWithSameSymbol.amount += transaction.amount;
    await coinWithSameSymbol.save();
    await transaction.save();

    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

const deleteTransactions = async (req, res, next) => {
  let { transactionId } = req.body;
  if (!Array.isArray(transactionId)) transactionId = [transactionId];
  try {
    const transactionsToDelete = await Transaction.find({ _id: { $in: transactionId } })

    /* Para minimizar la cantidad de veces que modifico cada moneda
     agrupo todas las transacciones correspondientes a un mismo simbolo */
    const totalAmountPerCoin = {}
    transactionsToDelete.forEach(t => {
      if (totalAmountPerCoin[t.symbol] === undefined) totalAmountPerCoin[t.symbol] = {amount: 0, id: t.coin};
      totalAmountPerCoin[t.symbol].amount += t.amount
    })
  
    for (const symbol in totalAmountPerCoin) {
      const coin = await UserCoin.findOne({_id: totalAmountPerCoin[symbol].id})
      coin.amount -= totalAmountPerCoin[symbol].amount
      await coin.save()
    }

    transactionsToDelete.map((transaction) => transaction.delete());
    await Promise.all(transactionsToDelete);

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
    await Transaction.findOneAndUpdate({ _id: transactionId }, update, { useFindAndModify: false });
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