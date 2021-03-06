/* jshint esversion:6 */

const express = require('express');
const Usuario = require('../models/user');

const bcrypt = require('bcrypt');
const _ = require('underscore');
const saltRounds = 10;
const { verifyToken, verifyAdmin_Role } = require('../middlewares/authentication');

const app = express();

// Rutas usuarios
// listar usuarios
app.get('/user', verifyToken, function(req, res) {
    let from = Number(req.query.from) || 0;
    let limite = Number(req.query.limit) || 5;

    Usuario.find({ deleted: false }, 'name email img role status google deleted')
        .limit(limite)
        .skip(from)
        .exec((error, users) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            Usuario.countDocuments({ deleted: false }, (err, total) => {
                res.json({
                    ok: true,
                    users: users,
                    total: total
                });
            });
        });
});
app.post('/user', [verifyToken, verifyAdmin_Role], function(req, res) {
    let body = req.body;

    let user = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        role: body.role
    });
    user.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            user: usuarioDB
        });
    });
});
app.put('/user/:id', [verifyToken, verifyAdmin_Role], function(req, res) {
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
            user: usuarioDB
        });
    });

});
app.delete('/user/:id', [verifyToken, verifyAdmin_Role], function(req, res) {
    let id = req.params.id;
    let deleteUser = {
        deleted: true
    };
    Usuario.findByIdAndUpdate(id, deleteUser, { new: true }, (error, userDeleted) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "User not found!"
                }
            });
        }
        res.json({
            ok: true,
            user: userDeleted
        });
    });
});

module.exports = app;