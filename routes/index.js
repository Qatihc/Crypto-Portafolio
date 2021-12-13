const Router = require('express').Router();

const authRouter = require('./authRouter');
const userRouter = require('./userRouter')
const portfolioRouter = require('./portfolioRouter');
const transactionRouter = require('./transactionRouter');

Router.use('/auth', authRouter);
Router.use('/portfolio', portfolioRouter);
Router.use('/transaction', transactionRouter);
Router.use('/user', userRouter);

module.exports = Router;