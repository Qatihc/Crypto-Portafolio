const portfolioRouter = require('express').Router();
const {requireAuth} = require('../controllers/authController');
const {
  retrieveUserCoins,
  retrievePortfolioReturns,
  createTransaction,
  deleteTransactions,
  updateTransaction,
  retrieveTransactions,
  retrieveTransactionsCount
} = require('../controllers/portfolioController');

portfolioRouter.post('/createTransaction', requireAuth, createTransaction);
portfolioRouter.post('/deleteTransaction', requireAuth, deleteTransactions);
portfolioRouter.post('/updateTransaction', requireAuth, updateTransaction);

portfolioRouter.get('/returns', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/coins', requireAuth, retrieveUserCoins);
portfolioRouter.get('/transaction', requireAuth, retrieveTransactions);
portfolioRouter.get('/count', requireAuth, retrieveTransactionsCount);

module.exports = portfolioRouter;