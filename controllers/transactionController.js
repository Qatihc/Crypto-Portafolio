const Transaction = require('../models/transactionSchema');

const addTransaction = async (req, res) => {
  await Transaction.create({
    user: '60c4a857e7b4bb5484cb8bbb',
    date: Date.now(),
    symbol: 'btc',
    amount: 30,
    price: 32000
  });
}

const updateTransaction = (req, res) => {
  res.send('updateTransaction')
}

const removeTransaction = (req, res) => {
  const {transactionId} = req.body;
  const {user} = req.locals;

  if (!transactionId) {

  }

  Transaction.deleteOne({_id: transactionId});
}

module.exports = {addTransaction, updateTransaction, removeTransaction};
