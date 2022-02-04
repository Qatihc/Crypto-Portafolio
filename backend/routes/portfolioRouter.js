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

portfolioRouter.post('/transaction/create', requireAuth, createTransaction);
portfolioRouter.post('/transaction/delete', requireAuth, deleteTransactions);
portfolioRouter.post('/transaction/update', requireAuth, updateTransaction);

module.exports = portfolioRouter;