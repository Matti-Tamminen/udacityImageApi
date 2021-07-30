import { Request, Response } from 'express'
const express = require('express')
const { checkFile, handleResize, returnImage } = require('../../utils')

const resize = express.Router()

resize.get('/', async (req: Request, res: Response) => {
    // parameters
    const { name, width, height } = req.query

    try {
        const isFile = checkFile(name, width, height)
        if (!isFile) {
            await handleResize(name, width, height)
        }
        const img = returnImage(name, width, height)

        res.status(200).end(img)
    } catch (err) {
        if (err.name == 'sharp') {
            console.log(`Error from handleResize() in image loading: ${err}`)
            res.status(500).send(
                '<h2>Something went wrong, check your values.<h2>'
            )
        } else if (err.name == 'fs') {
            console.log(`Error from returnImage() in returning image: ${err}`)
            res.status(500).send(
                '<h2>Something went wrong, check your file.<h2>'
            )
        } else {
            console.log(`Error from RESIZE: ${err}`)
            res.status(404).send(
                '<h2>Something went wrong, check your path.<h2>'
            )
        }
    }
})

export = resize
