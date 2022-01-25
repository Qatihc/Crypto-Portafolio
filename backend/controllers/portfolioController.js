const Portfolio = require('../models/portfolioSchema');
const Coin = require('../models/coinSchema');
const Transaction = require('../models/transactionSchema')

const inputErrorMessages = require('./utils/inputValidators/inputErrorMessages');
const RequestError = require('./utils/errorTypes/RequestError')

const retrieveUserPortfolio = async (req, res) => {
  const { portfolio } = res.locals.user;
  const coins = await Coin
    .find({ portfolio }, 'amount symbol')

  const coinsWithPrice = coins.map((coin) => {
    const price = req.app.locals.getCoinPriceFromSymbol(coin.symbol);
    /* Los objetos devueltos por una query de mongoose son inmutables, necesito aplicar el metodo toObject para poder modificarlo. */
    return Object.assign(coin.toObject(), { price })
  })

  res.send(coinsWithPrice);
}

const retrieveTransactionsCount = async (req, res, next) => {
  const { portfolio } = res.locals.user;
  try {
    const transactionsCount = await Transaction.aggregate([
      {
        $match: { portfolio }
      },
      {
        $count: "totalTransactions"
      }
    ])

    /* Aggregate devuelve el resultado como un array de un solo elemento */
    return res.send(transactionsCount[0]);
  } catch (err) {
    return next(err);
  }
}

const retrieveTransactions = async (req, res, next) => {
  const { symbol, offset = 0, limit = 20} = req.query;
  if (offset < 0) return res.status(401).send('Invalid offset');
  
  const { portfolio } = res.locals.user;
  const match = (symbol) ?
    ({ symbol, portfolio }) :
    ({ portfolio });

  const transactionsData = await Transaction.aggregate([
    { 
      $match: match 
    },
    {
      $sort: { date: -1 },
    },
    { $facet: 
      {
        totalTransactions: [{$count: "totalTransactions"}],
        transactions: [
          {
            $skip: Number(offset)
          },
          {
            $limit: limit,
          }
        ]
      }
    },
    {
      $project: {
        transactions: "$transactions",
        totalTransactions: { "$arrayElemAt": [ "$totalTransactions.totalTransactions", 0 ]}
      }
    }
  ])

  /* El aggregate devuelve el resultado como un array de un solo elemento */
  return res.send(transactionsData[0]);
}

const retrievePortfolioReturns = (req, res) => {
  res.send(res.locals.user.username);
}

const createTransaction = async (req, res, next) => {
  let {
    symbol,
    amount,
    price,
    date = Date.now() 
  } = req.body;
  amount = parseFloat(amount);
  symbol = symbol.toUpperCase();
  const { portfolio } = res.locals.user;

  if (!req.app.locals.isSupportedCoin(symbol)) return res.send('invalid coin');
  if (!amount) return res.send('Amount must not be 0');

  const coinWithSameSymbolAsTransaction = await Coin.findOne({ portfolio, symbol });
  if (!coinWithSameSymbolAsTransaction) {
    await Coin.create({ symbol, portfolio });
  }

  const coin = await Coin.findOne({ symbol, portfolio });
  transaction = new Transaction({ symbol, amount, price, date, coin: coin.id, portfolio })

  coin.amount += transaction.amount;

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
    const transactionDelete = await Transaction.deleteMany({ _id: { $in: transactionIds } })
    console.log(transactionDelete.deletedCount)
    /* TODO: CHEQUEAR SI REALMENTE BORRO ALGO! */
    return res.send('ok!')
  } catch (err) {
    console.log(err)
    return res.send('ok!')
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

  await Transaction.findOneAndUpdate({ _id: transactionId }, update, { useFindAndModify: false });
  res.send('ready go');
}

const retrievePortfolioCoinsPrice = async (req, res, next) => {
  try {
    const { portfolio } = res.locals.user;
    const coins = await Coin.find({ portfolio, amount: { $ne: 0 } }, 'amount symbol');

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
  retrievePortfolioCoinsPrice,
  retrieveTransactions,
  retrieveTransactionsCount
};