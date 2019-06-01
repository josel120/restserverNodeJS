/* jshint esversion:6 */

const express = require('express');
const Usuario = require('../models/user');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const _ = require('underscore');

// Rutas usuarios
// listar usuarios
app.get('/user', function(req, res) {
    Usuario.find({})
        .exec((error, users) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            res.json({
                ok: true,
                persona: users
            });
        });
});
app.post('/user', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        role: body.role
    });
    usuario.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            persona: usuarioDB
        });
    });
});
app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            persona: usuarioDB
        });
    });

});
app.delete('/user/:id', function(req, res) {
    res.json('DELETE user');
});

module.exports = app;