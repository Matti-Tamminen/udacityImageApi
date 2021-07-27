// testing endpoint functionality
describe('testing resize functionality', () => {
    const request = require('supertest')
    const express = require('express')
    const sharp = require('sharp')
    const fs = require('fs')
    const path = require('path')

    // path to full sized images
    const filepath = path.join(__dirname, '..', 'full', 'kuva.jpg')

    const app = express()

    app.get('/resize', function (req: any, res: any) {
        const { name, width, height } = req.query
        res.status(200).json({ name: name, width: width, height: height })
    })

    it('answers 200 with right parameters', () => {
        request(app)
            .get('/resize?name=pic&width=200&height=300')
            .expect(200)
            .expect({ name: 'pic', width: '200', height: '300' })
            .end(function (err: any, res: any) {
                if (err) throw err
            })
    })

    it('resizes images with sharp', async () => {
        let image: string | null = null
        // const image = sharp(filepath)
        //     .resize(200, 200)
        //     .then((img: any) => {
        //         img.toString('base64')
        //     })
        await sharp(filepath)
            .resize(200)
            .toBuffer()
            .then((data: any) => {
                image = data.toString('base64')
            })

        expect(image).not.toBe(null)
    })

    it('gets the image file from directory', () => {
        const image = fs.readFileSync(filepath, (err: Error, img: any) => {
            img.toString('base64')
        })
        expect(image).not.toBeFalsy()
    })
})