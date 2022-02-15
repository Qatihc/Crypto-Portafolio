const Transaction = require("../models/transactionSchema");
const UserCoin = require("../models/userCoinSchema");
const CoinMarketData = require("../models/coinMarketDataSchema");
const { COIN_MIN_AMOUNT_TO_DISPLAY } = require('../constants');

module.exports = class PortfolioServices {
  static getCoinCount = async ({ portfolio }) => {
    const count = await UserCoin.countDocuments({ portfolio, amount: { $gt: COIN_MIN_AMOUNT_TO_DISPLAY } });
    return count;
  }

  static getCoins = async ({ portfolio, offset, limit }) => {
    let coins = await UserCoin
    .find({ portfolio, amount: { $gt: COIN_MIN_AMOUNT_TO_DISPLAY } })
    .skip(Number(offset))
    .limit(Number(limit))
    .populate('coinMarketData', '-_id dailyChange marketCap price coinGeckoId')
    .lean()
  
    // Muevo todas las propiedades a la raiz del objeto.
    coins = coins.map((coin) => ({
      ...coin,
      ...coin.coinMarketData,
      coinMarketData: undefined
    }))

    return coins;
  }

  static getTransactionCount = async ({ portfolio }) => {
    const count = await Transaction.countDocuments({ portfolio });
    return count;
  }

  static getTransactions = async ({ portfolio, offset, limit }) => {
    const transactions = await Transaction
    .find({ portfolio })
    .sort({ date: -1 })
    .skip(Number(offset))
    .limit(Number(limit))
    .lean()

    return transactions;
  }

  static createTransaction = async ({ portfolio, symbol, amount, price, date }) => {
    date = date ?? Date.now();
    amount = parseFloat(amount);
    symbol = symbol.toUpperCase();
  
    // Hay monedas que copian el simbolo de otras, para intentar evitar elegir alguna de estas
    // si existen varias con el mismo simbolo elijo la que mas market cap tenga. 
  
    const coinMarketData = await CoinMarketData.findOne({ symbol }, null, { sort: { marketCap: -1 } });
    if (!coinMarketData) {
      /* Pasar esto a un custom error. */
      throw new Error('Simbolo invalido o moneda no soportada.');
    }

    const name = coinMarketData.name;
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
  }

  static deleteTransactionsById = async ({ ids }) => {
    const transactionsToDelete = await Transaction.find({ _id: { $in: ids } })

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
  }

  static updateTransactionById = async ({ id, update }) => {
    await Transaction.findOneAndUpdate({ _id: id }, update, { useFindAndModify: false });
  }
}
