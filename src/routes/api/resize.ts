const express = require('express')
const { checkFile, handleResize, returnImage } = require('../../utils')

const resize = express.Router()

resize.get('/', async (req: any, res: any) => {
    // parameters
    const { name, width, height } = req.query

    try {
        const isFile = checkFile(name, width, height)
        if (!isFile) {
            await handleResize(name, width, height, res)
        }
        returnImage(name, width, height, res)
    } catch (err) {
        console.log(`Error from RESIZE: ${err}`)
        res.status(404).send('<h2>Something went wrong, check your path.<h2>')
    }
})

export = resize
