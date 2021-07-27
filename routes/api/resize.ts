import { start } from "node:repl"

const express = require('express')
const sharp = require('sharp')
const path = require('path')

const resize = express.Router()

// path to full sized images
const filepath = path.join(__dirname, '..', '..', 'build', 'full')
// path to thumb sized images
const thumbpath = path.join(__dirname, '..', '..', 'build', 'thumb')

// const image = (name: string, url: string) => {
//     var img = new Image()
//     img.src = 'https://www.w3schools.com/html/tryit.asp?filename=tryhtml_images_trulli'


//     return img
// }

resize.get('/', (req: any, res: any, next: any) => {
    const { name, width, height } = req.query
    next()

    sharp(path.join(filepath, `${name}.jpg`))
        .resize(parseInt(width), parseInt(height))
        .toFile(path.join(thumbpath, `${name}2.jpg`))
        .catch((err: any) => {
            console.log(`Error from image loading: ${err}`)
            res.status(500).send('Something went wrong, check your path.')
        })
    res.sendFile(path.join(thumbpath, `${name}2.jpg`))
})

export = resize

// `http://localhost:3000${url}`
// http://localhost:3000${req.originalUrl}