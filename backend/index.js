const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5500;
const { 
  startUpdateSupportedCoins,
  startJobUpdateCoinPrices
} = require('./jobs/CoinGeckoApiJobs');

const server = app.listen(PORT, () => {
  console.log('App currently listening on port ' + PORT);
});

console.log(process.env);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    startUpdateSupportedCoins();
    startJobUpdateCoinPrices();
  }
  catch(e){
    console.error('No se pudo establecer conexion con la base de datos.')
    throw new Error(e);
  }
})()