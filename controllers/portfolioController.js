const Portfolio = require('../models/portfolioSchema');
const Coin = require('../models/coinSchema');
const Transaction = require('../models/transactionSchema')

const inputErrorMessages = require('../inputValidators/inputErrorMessages');
const RequestError = require('../errorTypes/RequestError')

// MOVER ESTO A DONDE TENGA SENTIDO!!!!!!
const MAX_LATEST_TRANSACTIONS = 10

const createPortfolio = async (req, res, next) => {
  /* TODO: Agregar chequeo para no crear multiples portfolio para el mismo usuario */
  const portfolio = await Portfolio.findOne({user: res.locals.user.id});
  if (portfolio) return next(new RequestError(inputErrorMessages.portfolioAlreadyExists, 400));

  try {
    await Portfolio.create({
      user: res.locals.user.id
    })
    res.status(200).send()
  } catch (err) {
    return next(err)
  }
}

const retrieveUserPortfolio = (req, res) => {
  res.send(res.locals.user.username);
}

const retrievePortfolioReturns = (req, res) => {
  res.send(res.locals.user.username);
}

const createTransaction = async (req, res, next) => {
  const { symbol, amount, price, date } = req.body;
  const { id } = res.locals.user;

  const portfolio = await Portfolio.findOne({user: id})
  if (!portfolio) return next('El usuario no tiene un portfolio creado.') // AGERGAR MENSAJE A LISTA DE MENSAJES ERROR

  if (portfolio.coins.every(e => e.symbol != symbol)) {
    portfolio.coins.push(Coin({symbol}));
  }
  coin = portfolio.coins.find(c => c.symbol == symbol)
  transaction = new Transaction({ symbol, amount, price, date })

  if (coin.latestTransactions.length > MAX_LATEST_TRANSACTIONS) coin.latestTransactions.pop()
  coin.latestTransactions.unshift(transaction);
  coin.transactions.push(transaction.id);
  coin.amount += transaction.amount;
  await portfolio.save();
  await transaction.save();
  res.send(transaction.id)
}

const deleteTransaction = async (req, res, next) => {
  const { transactionId } = req.body;
  const { id } = res.locals.user;

  const portfolio = await Portfolio.findOne({user: id});
  const transaction = await Transaction.findOne({_id: transactionId})

  const coin = portfolio.coins.find(c => c.symbol == transaction.symbol);
  // if (!coin) return next(coin)
  coin.amount -= transaction.amount;
  /* TODO: ver si puedo reemplazar esto por una query */
  coin.transactions = coin.transactions.filter(tId => tId != transactionId);
  coin.latestTransactions = coin.latestTransactions.filter(t => t.id != transactionId);
  /* TODO: buscar y agregar latest transaction para que sigan siendo 10 */
  await Transaction.deleteOne({_id: transactionId});
  await portfolio.save();
  res.send('ok!')
}

const updateTransactionAmount = async (req, res, next) => {
  res.send('WIP')
}

const updateTransactionPrice = async (req, res, next) => {
  res.send('WIP')
}

module.exports = {createPortfolio, retrieveUserPortfolio, retrievePortfolioReturns, createTransaction, deleteTransaction};