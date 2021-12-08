const coinRouter = require('express').Router();
const {
  searchCoins,
  retrieveTopCoins,
  retrieveCoinDetails
} = require('../controllers/coinController');
const {optionalAuth} = require('../controllers/authController');


coinRouter.get('/search/:coin', optionalAuth, searchCoins);
coinRouter.get('/topCoins', optionalAuth, retrieveTopCoins)
coinRouter.get('/:coinId', optionalAuth, retrieveCoinDetails);

module.exports = coinRouter;
