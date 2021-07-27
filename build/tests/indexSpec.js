"use strict";
// testing endpoint
describe('testing endpoints', function () {
    var request = require('supertest');
    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
        res.status(200).json({ status: 'ok' });
    });
    it('creates endpoint & answers with valid response', function () {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
    it('fails gracefully', function () {
        request(app)
            .get('/resiz')
            .expect(404)
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
});
