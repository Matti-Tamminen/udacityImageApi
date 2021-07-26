const express = require('express')

const resize = express.Router()

resize.get('/', (req: any, res: any) => {
    res.status(200).send('resize')
})

export = resize
