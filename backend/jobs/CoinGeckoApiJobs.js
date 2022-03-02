const schedule = require('node-schedule');

const startUpdateSupportedCoins = () => {
  const jobUpdateSupportedCoins = schedule.scheduleJob('* * */1 * *', updateSupportedCoins);
  return stopJob = () => {
    jobUpdateSupportedCoins.cancel();
  }
}

const startJobUpdateCoinPrices = () => {
  const jobUpdateCoinPrices = schedule.scheduleJob('* * */5 * * *', updateCoinMarketData);
  return stopJob = () => {
    jobUpdateCoinPrices.cancel();
  }
}


module.exports = {
  startUpdateSupportedCoins,
  startJobUpdateCoinPrices
}