"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// testing endpoint
describe('testing basic endpoints', function () {
    var request = require('supertest');
    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
        var _a = req.query, name = _a.name, width = _a.width, height = _a.height;
        res.status(200).json({ name: name, width: width, height: height });
    });
    it('answers 200 with right parameters', function () {
        request(app)
            .get('/?name=pic&width=200&height=300')
            .expect(200)
            .expect({ name: 'pic', width: '200', height: '300' })
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
    it('aswers 404 error with wrong path', function () {
        request(app)
            .get('/resiz')
            .expect(404)
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
});
