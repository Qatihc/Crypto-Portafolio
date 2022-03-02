const Router = require('express').Router();

const authRouter = require('./authRouter');
const portfolioRouter = require('./portfolioRouter');

Router.use('/auth', authRouter);
Router.use('/portfolio', portfolioRouter);

module.exports = Router;