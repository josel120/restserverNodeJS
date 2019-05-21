require('./config/config')

const express = require('express')
var bodyParser = require('body-parser')

const app = express()
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Hello World')
})

// Rutas usuarios
app.get('/usuario', function(req, res) {
    res.json('GET Usuarios')
})
app.post('/usuario', function(req, res) {
    let body = req.body;

    res.json({
        usuario: body
    })
})
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id: id
    })
})
app.delete('/usuario/:id', function(req, res) {
    res.json('DELETE Usuarios')
})

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: ", process.env.PORT)
})