const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  // La id viene implicita por parte de mongoose, por eso no la declaro.
})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;