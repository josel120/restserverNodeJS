/*jshint esversion: 6 */
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// configuracion de  rutas
app.use(require('./routes/routes'));


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (error, res) => {
    if (error) throw error;
    console.log("database online");
});

app.listen(process.env.PORT, () => {
    console.log("port listening: ", process.env.PORT);
});