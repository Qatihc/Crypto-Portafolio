const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  coins: [{
    symbol: String,
    amount: Number,
    avgPrice: Number,
  }],
})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;