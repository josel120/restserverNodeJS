/* jshint esversion:6 */
const express = require('express');

const app = express();

app.use(require('./users'));
app.use(require('./login'));
app.use(require('./category'));
app.use(require('./producto'));
app.use(require('./upload'));
app.use(require('./imagen'));

module.exports = app;