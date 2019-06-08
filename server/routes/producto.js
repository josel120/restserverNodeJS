/* jshint esversion:8 */
const express = require('express');
const Product = require('../models/producto');

const { verifyToken, verifyAdmin_Role } = require('../middlewares/authentication');

const app = express();

app.post('/product', [verifyToken, verifyAdmin_Role], (req, res) => {
    let body = req.body;

    let product = new Product({
        description: body.description,
        user: req.user._id,
        name: body.name,
        priceUni: body.priceUni,
        category: body.category
    });
    product.save((error, productDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.status(201).json({
            ok: true,
            product: productDB
        });
    });
});
app.get('/product', verifyToken, (req, res) => {
    Product.find({})
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, productsDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                products: productsDB
            });
        });
});
app.get('/product/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, productDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Product not found!"
                    }
                });
            }
            res.json({
                ok: true,
                product: productDB
            });
        })
        .populate('user', 'name email')
        .populate('category', 'description');
});
app.put('/product/:id', [verifyToken, verifyAdmin_Role], (req, res) => {
    let id = req.params.id;

    Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, productDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            product: productDB
        });
    });
});
app.delete('/product/:id', [verifyToken, verifyAdmin_Role], (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id, (err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Product not found!"
                }
            });
        }
        res.json({
            ok: true,
            product: productDB
        });
    });
});
module.exports = app;