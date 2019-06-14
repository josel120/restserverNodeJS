/* jshint esversion:8 */
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/user');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'file not found'
            }
        });
    }

    let tiposValidos = ['users', 'products'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Tipo no valido'
            }
        });
    }

    let archivo = req.files.archivo;
    let nombreArchivoSplit = archivo.name.split('.');
    let extension = nombreArchivoSplit[nombreArchivoSplit.length - 1];

    // extensions allowed
    let extensionAllowed = ['png', 'jpg', 'jpeg', 'gif'];

    if (extensionAllowed.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'extension not valid'
            }
        });
    }

    //cambiar nombre de archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;
    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (tipo === 'users') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {

            borrarArchivo(nombreArchivo, 'users');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }
        if (!usuarioDB) {

            borrarArchivo(nombreArchivo, 'users');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        borrarArchivo(usuarioDB.img, 'users');

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            if (err) {
                res.json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user: usuarioGuardado
            });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {

            borrarArchivo(nombreArchivo, 'products');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product not found'
                }
            });
        }
        if (!productoDB) {

            borrarArchivo(nombreArchivo, 'products');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product not found'
                }
            });
        }

        borrarArchivo(productoDB.img, 'products');

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            if (err) {
                res.json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado
            });
        });
    });
}

function borrarArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}
module.exports = app;