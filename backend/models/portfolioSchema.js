const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
/*   coins: [{
    type: Schema.ObjectId,
    ref: 'Coin'
  }] */
})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;