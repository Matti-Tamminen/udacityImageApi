// testing endpoint
describe('testing endpoints', () => {
    const request = require('supertest')
    const express = require('express')

    const app = express()

    app.get('/', function (req: any, res: any) {
        res.status(200).json({ status: 'ok' })
    })

    it('creates endpoint & answers with valid response', () => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end(function (err: any, res: any) {
                if (err) throw err
            })
    })
    it('fails gracefully', () => {
        request(app)
            .get('/resiz')
            .expect(404)
            .end(function (err: any, res: any) {
                if (err) throw err
            })
    })
})
