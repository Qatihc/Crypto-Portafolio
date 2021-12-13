const portfolioRouter = require('express').Router();
const {
  retrieveUserPortfolio,
  retrievePortfolioReturns,
  createPortfolio,
  createTransaction,
  deleteTransaction
} = require('../controllers/portfolioController');
const {requireAuth} = require('../controllers/authController');

portfolioRouter.post('/create', requireAuth, createPortfolio);
portfolioRouter.post('/createTransaction', requireAuth, createTransaction);
portfolioRouter.post('/deleteTransaction', requireAuth, deleteTransaction)

portfolioRouter.get('/returns/', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/', requireAuth, retrieveUserPortfolio);

module.exports = portfolioRouter;