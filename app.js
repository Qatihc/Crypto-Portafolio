require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ApiRouter = require('./routes/index.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', ApiRouter);

/* Si no entro a ninguna ruta, va al manejo de errores. */

app.get('/', (req, res) => {
  return res.status(200).send('asdasddsa');
})

app.use((err, req, res, next) => {
  if (!err || err.status == 404) {
    return res.status(404).send('Page not found.')
  }

  if (err.status) {
    return res.status(err.status).send(err.message)
  }

  // Si no tiene err status code asumo que es 500
  if (process.env.DEVELOPMENT) return res.status(500).send(err)
  return res.status(500).send('Internal server error.')

})

module.exports = app;