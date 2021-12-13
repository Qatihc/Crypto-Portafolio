const portfolioRouter = require('express').Router();
const {
  retrieveUserPortfolio,
  retrievePortfolioReturns,
  createTransaction,
  deleteManyTransaction
} = require('../controllers/portfolioController');
const {requireAuth} = require('../controllers/authController');

portfolioRouter.post('/createTransaction', requireAuth, createTransaction);
portfolioRouter.post('/deleteTransaction', requireAuth, deleteManyTransaction)

portfolioRouter.get('/returns', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/', requireAuth, retrieveUserPortfolio);

module.exports = portfolioRouter;