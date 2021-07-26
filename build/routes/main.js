"use strict";
var express = require('express');
var resize = require('./api/resize');
var routes = express.Router();
routes.get('/', function (req, res) {
    res.status(200).send('<h1>Resize images</h1><p>To request an image resize, navigate to /resize and apply parameters.</p>');
});
routes.use('/resize', resize);
module.exports = routes;
