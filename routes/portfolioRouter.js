const portfolioRouter = require('express').Router();
const {
  retrieveUserPortfolio,
  retrievePortfolioReturns
} = require('../controllers/portfolioController');
const {requireAuth} = require('../controllers/authController');

portfolioRouter.get('/returns/', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/', requireAuth, retrieveUserPortfolio);

module.exports = portfolioRouter;