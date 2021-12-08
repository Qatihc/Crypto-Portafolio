const Router = require('express').Router();

const authRouter = require('./authRouter');
const coinRouter = require('./coinRouter');
const portfolioRouter = require('./portfolioRouter');
const transactionRouter = require('./transactionRouter');

Router.use('/auth', authRouter);
Router.use('/coin', coinRouter);
Router.use('/portfolio', portfolioRouter);
Router.use('/transaction', transactionRouter);

module.exports = Router;