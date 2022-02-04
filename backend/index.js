const mongoose = require('mongoose');
const app = require('./app');
const { startCoinGeckoFetchJobs } = require('./services/coinGeckoFetchJobs');
const PORT = process.env.PORT || 5500;

const server = app.listen(PORT, () => {
  console.log('App currently listening on port ' + PORT);
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    startCoinGeckoFetchJobs();
  }
  catch(e){
    console.error('No se pudo establecer conexion con la base de datos.')
    throw new Error(e);
  }
})()