"use strict";
var express = require('express');
var sharp = require('sharp');
var path = require('path');
var resize = express.Router();
var thumbpath = path.join(__dirname, '..', '..', 'build', 'thumb');
resize.get('/', function (req, res, next) {
    var _a = req.query, name = _a.name, width = _a.width, height = _a.height;
    var filepath = path.join(__dirname, '..', '..', 'build', 'full', name + ".jpg");
    console.log("localhost:3000/api/resize" + req.url);
    next();
    sharp(filepath)
        .resize(parseInt(width), parseInt(height))
        .toFile(path.join(thumbpath, name + "2.jpg"))
        .catch(function (err) {
        console.log(err);
    });
    res.send("<img src=\"" + path.join(thumbpath, name + "2.jpg") + "\" alt=\"kuva\" />");
});
module.exports = resize;
// .jpeg({ mozjpeg: true })
//         .toBuffer()
//         .then((data: any) => {
//             res.status(200).send(`<img src="${req.url}" alt="kuva">${data}</img>`)
//         })
// , (err: any, info: any) => {
//     console.log(info)
// }
