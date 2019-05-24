const express = require('express');
const Usuario = require('../models/user');
const app = express();

// Rutas usuarios
app.get('/user', function(req, res) {
    res.json('GET users');
});
app.post('/user', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });
    usuario.save((error, usuarioDB) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            persona: usuarioDB
        });
    })
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