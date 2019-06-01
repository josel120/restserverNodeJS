/*jshint esversion: 6 */
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/users'));

app.get('/', function(req, res) {
    res.json('Hello World');
});


mongoose.connect('mongodb+srv://admin:admin@cloudmongo-soi7x.mongodb.net/cafePrueba', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (error, res) => {
    if (error) throw error;
    console.log("database online");
});

// mongoose.connect("mongodb+srv://admin:admin@pruebadb-zon1o.mongodb.net/test?retryWrites=true",
//     { 
//         useNewUrlParser: true 
//     }
// );

app.listen(process.env.PORT, () => {
    console.log("port listening: ", process.env.PORT);
});