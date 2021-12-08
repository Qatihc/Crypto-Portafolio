const searchCoins = (req, res) => {
  res.send(req.params.coin)
}

const retrieveTopCoins = (req, res) => {
  res.send('retrieveTopCoins')
}

const retrieveCoinDetails = (req, res) => {
  res.send('retrieveCoinDetails')
}

module.exports = {searchCoins, retrieveTopCoins, retrieveCoinDetails}