require('dotenv').config();
const express = require('express');
const path = require("path")
const cors = require('cors');
const ApiRouter = require('./routes/index.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', ApiRouter);
app.use('/api', express.static('public/logos'));

app.use(express.static(path.join(__dirname, "../frontend", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});

/* Si no entro a ninguna ruta, va al manejo de errores. */
app.use((err, req, res, next) => {
  if (!err || err.status == 404) {
    return res.status(404).send('Endpoint not found.')
  }

  if (err.status) {
    console.log(err.message)
    return res.status(err.status).send({ err: err.message });
  }

  // Si no tiene err status code asumo que es 500
  console.log(err)
  
  if (process.env.DEVELOPMENT) return res.status(500).send(err)

  return res.status(500).send('Internal server error.')
})


module.exports = app;
