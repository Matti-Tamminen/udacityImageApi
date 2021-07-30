// testing endpoint functionality
describe('testing resize functionality', () => {
    const request = require('supertest')
    const express = require('express')
    const fs = require('fs')
    const path = require('path')
    const { checkFile, handleResize, returnImage } = require('../src/utils')
    const resize = require('../src/routes/api/resize')

    // path to full sized images
    // root folder
    const root = path.resolve('./')
    // path to full sized images
    const filepath = path.join(root, 'data', 'full', 'kuva.jpg')
    // path to thumb sized images
    const thumbpath = path.join(root, 'data', 'thumb', 'kuva500x500.jpg')

    const app = express()

    app.use('/resize', resize)

    it('returns 200 after route init', () => {
        request(app).get('/resize').expect(200)
    })

    it('handles handleResize and returnImage', async () => {
        await handleResize('kuva', '500', '500')
        const image = returnImage('kuva', '500', '500')

        expect(image).toBeTruthy()
    })

    it('handles checkFile', () => {
        const isTrue = checkFile('kuva', '500', '500')
        const isFalse = checkFile('kuva', '40', '4')

        expect(isTrue).toBeTrue()
        expect(isFalse).toBeFalse()
    })

    const clean = (): void => {
        fs.unlinkSync(thumbpath) //deletes the created image
    }

    process.on('exit', () => {
        clean()
    })
})
