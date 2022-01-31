const Portfolio = require('../models/portfolioSchema');
const Coin = require('../models/coinSchema');
const Transaction = require('../models/transactionSchema')

const retrieveSupportedCoins = async (req, res) => {
  console.log(req.app.locals.getSupportedCoins())
  res.send(req.app.locals.getSupportedCoins());
}

const retrieveUserCoins = async (req, res) => {
  const { portfolio } = res.locals.user;
  const coins = await Coin
    .find({ portfolio }, 'amount symbol')

  const coinsWithPrice = coins.map((coin) => {
    const marketData = req.app.locals.getCoinMarketDataFromSymbol(coin.symbol);
    /* Los objetos devueltos por una query de mongoose son inmutables, necesito aplicar el metodo toObject para poder modificarlo. */
    return Object.assign(coin.toObject(), { ...marketData })
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
            $limit: +limit,
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

  if (!req.app.locals.isSupportedCoin(symbol)) return res.status(400).send('Symbolo invalido.');
  if (!amount) return res.status(400).send('La cantidad debe ser distinta de 0.');

  try {
    let coinWithSameSymbol = await Coin.findOne({ portfolio, symbol });
    if (!coinWithSameSymbol) {
      coinWithSameSymbol = await Coin.create({ symbol, portfolio });
    }

    const transaction = new Transaction({ 
      symbol,
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
      const coin = await Coin.findOne({_id: totalAmountPerCoin[symbol].id})
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
  retrieveSupportedCoins,
  retrieveUserCoins,
  retrievePortfolioReturns,
  createTransaction,
  deleteTransactions,
  updateTransaction,
  retrieveTransactions,
  retrieveTransactionsCount
};