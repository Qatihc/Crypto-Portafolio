const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
  catch(e){
    console.error('No se pudo establecer conexion con la base de datos.')
    throw new Error(e);
  }
}

const disconnect = async () => {
  await mongoose.disconnect();
}

module.exports = {
  mongoose,
  connect,
  disconnect
}