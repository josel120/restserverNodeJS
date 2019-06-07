/* jshint esversion:8 */
const express = require('express');
const Category = require('../models/category');

const { verifyToken, verifyAdmin_Role } = require('../middlewares/authentication');

const app = express();

app.post('/category', verifyToken, (req, res) => {
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id
    });
    category.save((error, categoryDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            category: categoryDB
        });
    });
});
app.get('/category', (req, res) => {
    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categories: categoryDB
            });
        });
});
app.get('/category:id', (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoy not found!"
                }
            });
        }
        res.json({
            ok: true,
            categories: categoryDB
        });
    });

});
app.put('/category/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Category.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, categoryDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            user: categoryDB
        });
    });
});
app.delete('/category/:id', [verifyToken, verifyAdmin_Role], (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Categoy not found!"
                }
            });
        }
        res.json({
            ok: true,
            user: categoryDB
        });
    });

});

module.exports = app;