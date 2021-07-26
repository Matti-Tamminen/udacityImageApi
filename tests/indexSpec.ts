// testing endpoint
describe('testing endpoints', () => {
    const request = require('supertest')
    const express = require('express')

    const app = express()
    it('creation & example response', () => {
        app.get('/resize', function (req: any, res: any) {
            res.status(200).json({ status: 'ok' })
        })

        request(app)
            .get('/resize')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end(function (err: any, res: any) {
                if (err) throw err
            })
    })
})
