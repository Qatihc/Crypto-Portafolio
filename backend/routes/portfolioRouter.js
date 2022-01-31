const portfolioRouter = require('express').Router();
const { requireAuth, optionalAuth } = require('../controllers/authController');
const {
  retrieveSupportedCoins,
  retrieveUserCoins,
  retrievePortfolioReturns,
  createTransaction,
  deleteTransactions,
  updateTransaction,
  retrieveTransactions,
  retrieveTransactionsCount
} = require('../controllers/portfolioController');

portfolioRouter.get('/supportedCoins', optionalAuth, retrieveSupportedCoins);
portfolioRouter.get('/returns', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/coins', requireAuth, retrieveUserCoins);
portfolioRouter.get('/transaction', requireAuth, retrieveTransactions);
portfolioRouter.get('/count', requireAuth, retrieveTransactionsCount);

portfolioRouter.post('/createTransaction', requireAuth, createTransaction);
portfolioRouter.post('/deleteTransaction', requireAuth, deleteTransactions);
portfolioRouter.post('/updateTransaction', requireAuth, updateTransaction);

module.exports = portfolioRouter;