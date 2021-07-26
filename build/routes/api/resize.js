"use strict";
var express = require('express');
var resize = express.Router();
resize.get('/', function (req, res) {
    res.status(200).send('resize');
});
module.exports = resize;
