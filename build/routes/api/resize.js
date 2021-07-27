"use strict";
var express = require('express');
var sharp = require('sharp');
var fs = require('fs');
var path = require('path');
var resize = express.Router();
resize.get('/', function (req, res) {
    // path to full sized images
    var filepath = path.join(__dirname, '..', '..', 'build', 'full');
    // path to thumb sized images
    var thumbpath = path.join(__dirname, '..', '..', 'build', 'thumb');
    // parameters
    var _a = req.query, name = _a.name, width = _a.width, height = _a.height;
    // using sharp to modify image
    sharp(path.join(filepath, name + ".jpg"))
        .resize(parseInt(width), parseInt(height))
        .toFile(path.join(thumbpath, name + "2.jpg"))
        .catch(function (err) {
        console.log("Error from image loading: " + err);
        res.writeHead(500, { 'Content-type': 'text/html' });
        res.end('Something went wrong, check your path.');
    });
    // using filereader to return image
    fs.readFile(path.join(thumbpath, name + "2.jpg"), function (err, img) {
        if (err) {
            console.log("Error from returning image: " + err);
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.end('Image not found');
        }
        else {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(img);
        }
    });
});
module.exports = resize;
