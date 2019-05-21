const express = require('express');
const app = express();

// Rutas usuarios
app.get('/user', function(req, res) {
    res.json('GET users');
});
app.post('/user', function(req, res) {
    let body = req.body;

    res.json({
        user: body
    });
});
app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id: id
    });
});
app.delete('/user/:id', function(req, res) {
    res.json('DELETE user');
});

module.exports = app;