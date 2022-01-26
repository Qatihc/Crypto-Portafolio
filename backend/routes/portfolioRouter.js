const portfolioRouter = require('express').Router();
const {requireAuth} = require('../controllers/authController');
const {
  retrieveUserCoins,
  retrievePortfolioReturns,
  createTransaction,
  deleteManyTransaction,
  updateTransaction,
  retrieveTransactions,
  retrieveTransactionsCount
} = require('../controllers/portfolioController');

portfolioRouter.post('/create', requireAuth, createTransaction);
portfolioRouter.post('/delete', requireAuth, deleteManyTransaction);
portfolioRouter.post('/update', requireAuth, updateTransaction);

portfolioRouter.get('/returns', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/coins', requireAuth, retrieveUserCoins);
portfolioRouter.get('/transaction', requireAuth, retrieveTransactions);
portfolioRouter.get('/count', requireAuth, retrieveTransactionsCount);

module.exports = portfolioRouter;