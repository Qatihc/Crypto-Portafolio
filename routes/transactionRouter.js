const transactionRouter = require('express').Router();
const transactionController = require('../controllers/transactionController');

const {
  addTransaction,
  updateTransaction,
  removeTransaction
} = transactionController;
const {requireAuth} = require('../controllers/authController');

transactionRouter.post('/add', requireAuth, addTransaction);
transactionRouter.post('/update', requireAuth, updateTransaction);
transactionRouter.post('/remove', requireAuth, removeTransaction);

module.exports = transactionRouter;