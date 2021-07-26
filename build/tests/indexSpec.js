"use strict";
// testing endpoint
describe('testing endpoints', function () {
    var request = require('supertest');
    var express = require('express');
    var app = express();
    it('creation & example response', function () {
        app.get('/resize', function (req, res) {
            res.status(200).json({ status: 'ok' });
        });
        request(app)
            .get('/resize')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
});
