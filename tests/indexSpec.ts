import { Request, Response } from 'express'
// testing endpoint
describe('testing basic endpoints', () => {
    const request = require('supertest')
    const express = require('express')

    const app = express()

    app.get('/', function (req: Request, res: Response) {
        const { name, width, height } = req.query
        res.status(200).json({ name: name, width: width, height: height })
    })

    it('answers 200 with right parameters', () => {
        request(app)
            .get('/?name=pic&width=200&height=300')
            .expect(200)
            .expect({ name: 'pic', width: '200', height: '300' })
            .end(function (err: Error, res: Response) {
                if (err) throw err
            })
    })

    it('aswers 404 error with wrong path', () => {
        request(app)
            .get('/resiz')
            .expect(404)
            .end(function (err: Error, res: Response) {
                if (err) throw err
            })
    })
})
