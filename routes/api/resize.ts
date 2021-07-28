const express = require('express')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const resize = express.Router()

resize.get('/', async (req: any, res: any) => {
    const root = path.resolve('./')
    // path to full sized images
    const filepath = path.join(root, 'build', 'full')
    // path to thumb sized images
    const thumbpath = path.join(root, 'build', 'thumb')
    // parameters
    const { name, width, height } = req.query

    // checks if the image exists
    let pics: any[] = []
    fs.readdir(thumbpath, (err: Error, files: any) => {
        if (err) {
            console.log(`Error in checking files: ${err}`)
            res.writeHead(500, { 'Content-type': 'text/html' })
            res.end('Something went wrong, directory search failed.')
        }
        pics = files
    })

    // using sharp to modify image
    if (!pics.includes(`${name}${width}x${height}.jpg`)) {
        await sharp(path.join(filepath, `${name}.jpg`))
            .resize(parseInt(width), parseInt(height))
            .toFile(path.join(thumbpath, `${name}${width}x${height}.jpg`))
            .catch((err: Error) => {
                console.log(`Error from image loading: ${err}`)
                res.writeHead(500, { 'Content-type': 'text/html' })
                res.end('Something went wrong, check your path.')
            })
    }

    // using filereader to return image
    fs.readFile(
        path.join(thumbpath, `${name}${width}x${height}.jpg`),
        (err: Error, img: File) => {
            if (err) {
                console.log(`Error from returning image: ${err}`)

                res.writeHead(404, { 'Content-type': 'text/html' })
                res.end('Image not found')
            } else {
                res.writeHead(200, { 'Content-type': 'image/jpg' })
                res.end(img)
            }
        }
    )
})

export = resize
