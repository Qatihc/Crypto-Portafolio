const Portfolio = require('../models/portfolioSchema');

const retrieveUserPortfolio = (req, res) => {
  res.send(res.locals.user.username);
}

const retrievePortfolioReturns = (req, res) => {
  res.send(res.locals.user.username);
}

module.exports = {retrieveUserPortfolio, retrievePortfolioReturns};
