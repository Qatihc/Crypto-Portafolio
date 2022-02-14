const Transaction = require("../models/transactionSchema");

export const TransactionRepository = {
  create = async ({
    symbol,
    name,
    amount,
    price,
    date,
    coin,
    portfolio 
  }) => {
    const newTransaction = await Transaction.create({
      symbol,
      name,
      amount,
      price,
      date,
      coin,
      portfolio
    });
    return newTransaction;
  }


}