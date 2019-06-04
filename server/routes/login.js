/* jshint esversion:6 */
const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/user');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password Invalid'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password Invalid'
                }
            });
        }
        res.json({
            ok: true,
            message: 'User logged'
        });
    });
});

module.exports = app;