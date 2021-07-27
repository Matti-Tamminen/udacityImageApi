"use strict";
var express = require('express');
var resize = require('./api/resize');
var routes = express.Router();
routes.get('/', function (req, res) {
    res.status(200).send("<h1>Resize images</h1>\n        <p>To request an image resize, navigate to /resize and apply parameters:</p>\n        <ul>\n        <li>name - image name without type</li>\n        <li>width - image width numbers</li>\n        <li>height - image height numbers</li>\n        </ul>");
});
routes.use('/resize', resize);
module.exports = routes;
