const portfolioRouter = require('express').Router();
const {requireAuth} = require('../controllers/authController');
const {
  retrieveUserPortfolio,
  retrievePortfolioReturns,
  createTransaction,
  deleteManyTransaction,
  updateTransaction,
  retrievePortfolioCoinsPrice,
  retrieveTransactions,
  retrieveTransactionsCount
} = require('../controllers/portfolioController');

portfolioRouter.post('/createTransaction', requireAuth, createTransaction);
portfolioRouter.post('/deleteTransaction', requireAuth, deleteManyTransaction);
portfolioRouter.post('/updateTransaction', requireAuth, updateTransaction);

portfolioRouter.get('/returns', requireAuth, retrievePortfolioReturns);
portfolioRouter.get('/', requireAuth, retrieveUserPortfolio);
portfolioRouter.get('/transaction', requireAuth, retrieveTransactions);
portfolioRouter.get('/count', requireAuth, retrieveTransactionsCount);
portfolioRouter.get('/coinsPrice', requireAuth, retrievePortfolioCoinsPrice);

portfolioRouter.get('/test', (req, res, next) => {res.send(req.app.locals.coinPrices)})
module.exports = portfolioRouter;