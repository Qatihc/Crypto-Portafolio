const mongoose = require('mongoose');
const Coin = require('./coinSchema')
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  coins: [Coin],
})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;