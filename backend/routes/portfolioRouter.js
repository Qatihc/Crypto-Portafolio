const portfolioRouter = require('express').Router();
const { requireAuth, optionalAuth } = require('../controllers/authController');
const {
  retrieveUserCoins,
  retrievePortfolioReturns,
  createTransaction,
  deleteTransactions,
  updateTransaction,
  retrieveTransactions,
  retrieveTransactionsCount,
  retrieveUserCoinsCount
} = require('../controllers/portfolioController');

portfolioRouter.get('/returns', requireAuth, retrievePortfolioReturns);

portfolioRouter.get('/coin', requireAuth, retrieveUserCoins);
portfolioRouter.get('/coin/count', requireAuth, retrieveUserCoinsCount);

portfolioRouter.get('/transaction', requireAuth, retrieveTransactions);
portfolioRouter.get('/transaction/count', requireAuth, retrieveTransactionsCount);

portfolioRouter.post('/createTransaction', requireAuth, createTransaction);
portfolioRouter.post('/deleteTransaction', requireAuth, deleteTransactions);
portfolioRouter.post('/updateTransaction', requireAuth, updateTransaction);

module.exports = portfolioRouter;